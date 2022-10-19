import { SimpleShortcut } from '@/utils'
import { camelCase, isNil } from 'lodash-es'
import { App, ObjectDirective } from 'vue'

const getStyleSheet = () => document.styleSheets[0]

class Directive<T extends HTMLElement, V = any> {
  private _mounted: ObjectDirective<T, V>['mounted']
  private _updated: ObjectDirective<T, V>['updated']
  private _unmounted: ObjectDirective<T, V>['unmounted']

  constructor(public name: string) {}

  set mounted(mounted: ObjectDirective<T, V>['mounted']) {
    this._mounted = mounted
  }

  set updated(updated: ObjectDirective<T, V>['updated']) {
    this._updated = updated
  }

  set unmounted(unmounted: ObjectDirective<T, V>['unmounted']) {
    this._unmounted = unmounted
  }

  register(app: App) {
    app.directive(this.name, {
      mounted: this._mounted,
      updated: this._updated,
      unmounted: this._unmounted,
    })
  }
}

export const shortcutDirective = (() => {
  const directive = new Directive('shortcut')
  const shortcuts: (SimpleShortcut | null)[] = []

  directive.mounted = (el, binding, vnode) => {
    const shortcutValues = binding.value.replace(/\s/gi, '').split('+')
    const shortcutText = `(${shortcutValues.join('+')})`
    const styleSheet = getStyleSheet()
    const shortcut = new SimpleShortcut({
      type: 'keydown',
      handler() {
        if (el instanceof HTMLButtonElement) el.click()
        else el.focus()
      },
    })
    const shortcutIndex = shortcuts.push(shortcut) - 1

    shortcutValues.forEach(key => {
      !isNil(shortcut[`${key}Key`])
        ? (shortcut[`${key}Key`] = true)
        : (shortcut.key = camelCase(key))
    })

    el.dataset.shortcutIndex = `${shortcutIndex}`

    if (el instanceof HTMLButtonElement) {
      el.style.setProperty('--shortcut', `'${shortcutText}'`)

      const index = styleSheet.insertRule(
        `button[${vnode.scopeId}]::after { content: var(--shortcut); }`
      )

      el.style.setProperty('--index', `${index}`)
    } else if (el instanceof HTMLInputElement) {
      el.placeholder = el.placeholder.replace(shortcutText, '') + shortcutText
    }

    shortcut.connect()
  }

  directive.updated = (el, binding) => {
    const shortcutValues = binding.value.replace(/\s/gi, '').split('+')
    const shortcutText = `(${shortcutValues.join('+')})`
    const shortcutIndex = +el.dataset.shortcutIndex!
    const shortcut = shortcuts[shortcutIndex]!
    const prevShortcutText = `(${shortcut})`

    shortcutValues.forEach(key => {
      !isNil(shortcut[`${key}Key`])
        ? (shortcut[`${key}Key`] = true)
        : (shortcut.key = camelCase(key))
    })

    if (el instanceof HTMLButtonElement) {
      el.style.setProperty('--shortcut', `'${shortcutText}'`)
    } else if (el instanceof HTMLInputElement) {
      el.placeholder =
        el.placeholder.replace(prevShortcutText, '') + shortcutText
    }
  }

  directive.unmounted = el => {
    const styleSheet = getStyleSheet()
    const index = +el.style.getPropertyValue('--index')
    const shortcutIndex = +el.dataset.shortcutIndex!
    const shortcut = shortcuts[shortcutIndex]!

    styleSheet.deleteRule(index)
    shortcut.disconnect()

    shortcuts[shortcutIndex] = null
  }

  return directive
})()
