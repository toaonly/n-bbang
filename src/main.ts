import { createApp } from 'vue'
import App from './App.vue'
// import router from './router'
import directives from './directives'
import store from './store'
import './styles.scss'

const app = createApp(App).use(store).use(directives)

app.mount('#app')
