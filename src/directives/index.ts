import { Plugin } from 'vue'
import { shortcutDirective } from './shortcut'

const directives: Plugin = {
  install(app) {
    shortcutDirective.register(app)
  },
}

export default directives
