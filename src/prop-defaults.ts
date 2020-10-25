import { VueNeatModalProps } from 'types'

const propDefaults: VueNeatModalProps = {
  clickOut: true,
  eager: false,
  teleportTarget: '#app',
  backdropTransition: undefined,
  contentTransition: 'scale',
  disableMotion: false,
  removeBackdrop: false,
  width: 'auto',
  maxWidth: 'none',
  fullscreen: false
}

const setDefaults = (options: VueNeatModalProps | undefined) => {
  if (!options) return

  Object.assign(propDefaults, options)
}

const getGlobalPropDefault = (prop: string) => propDefaults[prop]

export {
  setDefaults,
  getGlobalPropDefault
}
