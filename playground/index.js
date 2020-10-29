import { createApp } from 'vue'
import App from './App'
import { setDefaultProps } from '../'

const app = createApp(App)

setDefaultProps({
  contentTransition: 'slide-down'
})

app.mount(document.getElementById('app'))
