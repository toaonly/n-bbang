import { SimpleShortcut } from '@/utils'
import { camelCase, isNil } from 'lodash-es'
import { App, ObjectDirective, Plugin } from 'vue'

const getStyleSheet = () => document.styleSheets[0]

class _Directive<T extends HTMLElement, V = any> {
  onMounted: ObjectDirective<T, V>['mounted']
  onUpdated: ObjectDirective<T, V>['updated']
  onUnmounted: ObjectDirective<T, V>['unmounted']

  constructor(public name: string) {}

  setMounted(
    this: _Directive<T, V>,
    onMounted: ObjectDirective<T, V>['mounted']
  ) {
    this.onMounted = onMounted?.bind(this)

    return this
  }

  setUpdated(onUpdated: ObjectDirective<T, V>['updated']) {
    this.onUpdated = onUpdated?.bind(this)

    return this
  }

  setUnmounted(onUnmounted: ObjectDirective<T, V>['unmounted']) {
    this.onUnmounted = onUnmounted?.bind(this)

    return this
  }

  addProp<K extends string, V>(key: K, value: V) {
    this[key as string] = value

    return this as this & _Directive<T, V> & Record<K, V>
  }

  build(app: App) {
    app.directive(this.name, {
      mounted: this.onMounted,
      updated: this.onUpdated,
      unmounted: this.onUnmounted,
    })
  }
}

const directives: Plugin = {
  install(app) {
    const shortcut = new SimpleShortcut({
      key: '',
      type: 'keydown',
    })
    const shortcutDirective = new _Directive<
      HTMLButtonElement | HTMLInputElement,
      string
    >('shortcut').addProp('shortcut', shortcut)

    shortcutDirective
      .setMounted(function (el, binding, vnode) {
        const shortcut = binding.value.replace(/\s/gi, '').split('+')
        const styleSheet = getStyleSheet()

        shortcut.forEach(key => {
          if (!isNil(shortcutDirective.shortcut[`${key}Key`])) {
            shortcutDirective.shortcut[`${key}Key`] = true
          } else {
            shortcutDirective.shortcut.key = key.toLowerCase()
          }
        })
        shortcutDirective.shortcut.handler = () => el.click()

        if (el instanceof HTMLButtonElement) {
          console.log(shortcut, shortcutDirective.shortcut)
          el.style.setProperty('--shortcut', `'(${shortcut.join('+')})'`)

          const index = styleSheet.insertRule(
            `button[${vnode.scopeId}]::after { content: var(--shortcut); }`
          )

          el.style.setProperty('--index', `${index}`)
        } else if (el instanceof HTMLInputElement) {
          el.placeholder = shortcut.join('+')
        }

        shortcutDirective.shortcut.connect()
      })
      .setUpdated((el, binding) => {
        const shortcut = binding.value.replace(/\s/gi, '').split('+')

        shortcut.forEach(key => {
          if (!isNil(shortcutDirective.shortcut[`${key}Key`])) {
            shortcutDirective.shortcut[`${key}Key`] = true
          } else {
            shortcutDirective.shortcut.key = camelCase(key)
          }
        })
        shortcutDirective.shortcut.connect()
        el.style.setProperty('--shortcut', `'(${shortcut.join('+')})'`)
      })
      .setUnmounted(el => {
        const styleSheet = getStyleSheet()
        const index = +el.style.getPropertyValue('--index')

        styleSheet.deleteRule(index)

        shortcutDirective.shortcut.disconnect()
      })

    shortcutDirective.build(app)
  },
}

export default directives
