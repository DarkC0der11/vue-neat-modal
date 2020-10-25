import { Plugin } from 'vue'
import { setDefaults } from './prop-defaults'
import { VueNeatModalPluginOptions } from 'types'

const plugin: Plugin = {
  install (_, options: VueNeatModalPluginOptions) {
    setDefaults(options.defaultProps)
  }
}

export default plugin
