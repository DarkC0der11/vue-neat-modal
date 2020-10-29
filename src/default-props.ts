import { VueNeatModalProps } from 'types'

const defaultProps: VueNeatModalProps = {
  clickOut: true,
  eager: false,
  teleportTarget: '#app',
  backdropTransition: undefined,
  modalTransition: 'scale',
  disableMotion: false,
  removeBackdrop: false,
  width: 'auto',
  maxWidth: 'none',
  fullscreen: false
}

const setDefaultProps = (options: VueNeatModalProps | undefined) => {
  if (!options) return

  Object.assign(defaultProps, options)
}

const getDefaultProp = (prop: string) => defaultProps[prop]

export {
  setDefaultProps,
  getDefaultProp
}
