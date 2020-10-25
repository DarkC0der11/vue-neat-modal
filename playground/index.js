import { createApp } from 'vue'
import App from './App'
import VueNeatModal from '../'

const app = createApp(App)

app.use(VueNeatModal, {
  defaultProps: {
    contentTransition: 'slide-down'
  }
})

app.mount(document.getElementById('app'))
