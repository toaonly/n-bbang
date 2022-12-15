import { fromEvent, Subscription } from 'rxjs'
import { map, filter, tap } from 'rxjs/operators'
import { isNil, isArray } from 'lodash-es'

abstract class AbstractSimpleShortcut<T> {
  constructor(
    public code: string | string[] | null | undefined,
    public key: string | string[] | null | undefined,
    public target: T | Window = window,
    public handler: (...args: any[]) => void = () => {}
  ) {}
}

export default class SimpleShortcut<
  T extends HTMLElement | Window = Window
> extends AbstractSimpleShortcut<T> {
  type?: KeyboardEvent[keyof Pick<KeyboardEvent, 'type'>] = ''
  shiftKey? = false
  ctrlKey? = false
  altKey? = false
  metaKey? = false

  private subscription!: Subscription

  constructor(
    options: Partial<
      Pick<
        KeyboardEvent,
        'altKey' | 'ctrlKey' | 'metaKey' | 'shiftKey' | 'type'
      > &
        AbstractSimpleShortcut<T>
    >
  ) {
    super(options.code, options.key, options.target, options.handler)

    this.type = options?.type
    this.shiftKey = options?.shiftKey ?? false
    this.ctrlKey = options?.ctrlKey ?? false
    this.altKey = options?.altKey ?? false
    this.metaKey = options?.metaKey ?? false
  }

  get matchedCount() {
    const { code, key } = this

    return isArray(code)
      ? code.length
      : +!isNil(code) + (isArray(key) ? key.length : +!isNil(key))
  }

  private _isMatched(params: KeyboardEvent) {
    const { shiftKey, ctrlKey, altKey, metaKey } = this

    return (
      this._equalCodeOrKey({ key: params.key, code: params.code }) &&
      shiftKey === params.shiftKey &&
      ctrlKey === params.ctrlKey &&
      altKey === params.altKey &&
      metaKey === params.metaKey
    )
  }

  private _equalCodeOrKey(params: Pick<KeyboardEvent, 'code' | 'key'>) {
    const { code, key } = this

    return Array.of(code, key).some(v => {
      return isArray(v)
        ? v.find(_v => _v === params.key) || v.find(_v => _v === params.code)
        : v === params.key || v === params.code
    })
  }

  connect() {
    const { type, handler, target } = this

    this.disconnect()
    // @ts-ignore
    this.subscription = fromEvent(target, type)
      .pipe(
        map(e => ({ e, isMatched: this._isMatched(e as KeyboardEvent) })),
        filter(({ isMatched }) => isMatched),
        tap(({ e }) => e.preventDefault())
      )
      .subscribe(({ e }) => {
        handler!(e)
      })
  }

  disconnect() {
    this.subscription?.unsubscribe()
  }

  toString() {
    const { ctrlKey, altKey, shiftKey, metaKey, key } = this
    const combineKeys = {
      ctrlKey,
      altKey,
      shiftKey,
      metaKey,
    }

    return (
      Object.entries(combineKeys).reduce(
        (acc, [key, value]) =>
          acc + (value ? `${key.replace('Key', '')}+` : ''),
        ''
      ) + key
    )
  }
}
