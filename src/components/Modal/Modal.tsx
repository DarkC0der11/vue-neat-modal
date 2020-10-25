import './Modal.scss'
import {
  computed,
  defineComponent,
  Teleport,
  ref,
  watch,
  Transition,
  onUnmounted
} from 'vue'

import { getGlobalPropDefault } from '../../prop-defaults'

const COMPONENT_CLASS = 'vue-neat-modal'

export default defineComponent({
  inheritAttrs: false,

  props: {
    modelValue: {
      type: Boolean,
      default: undefined
    },

    eager: {
      type: Boolean,
      default: () => getGlobalPropDefault('eager')
    },

    clickOut: {
      type: Boolean,
      default: () => getGlobalPropDefault('clickOut')
    },

    teleportTarget: {
      type: [String, HTMLElement],
      default: () => getGlobalPropDefault('teleportTarget')
    },

    backdropTransition: {
      type: String,
      default: () => getGlobalPropDefault('backdropTransition')
    },

    contentTransition: {
      type: String,
      default: () => getGlobalPropDefault('contentTransition')
    },

    disableMotion: {
      type: Boolean,
      default: () => getGlobalPropDefault('disableMotion')
    },

    removeBackdrop: {
      type: Boolean,
      default: () => getGlobalPropDefault('removeBackdrop')
    },

    width: {
      type: String,
      default: () => getGlobalPropDefault('width')
    },

    maxWidth: {
      type: String,
      default: () => getGlobalPropDefault('maxWidth')
    },

    fullscreen: {
      type: Boolean,
      default: () => getGlobalPropDefault('fullscreen')
    }
  },

  setup (props, { slots, emit }) {
    const innerValue = ref(false)
    const isMounted = ref(props.eager)
    const isVisible = computed(() => (
      props.modelValue ||
        innerValue.value
    ))

    const style = computed(() => ({
      maxWidth: props.maxWidth
    }))

    const classes = computed(() => ({
      [`${COMPONENT_CLASS}`]: true,
      [`${COMPONENT_CLASS}--fullscreen`]: props.fullscreen
    }))

    watch([() => props.modelValue, innerValue], (modelValue, innerValue) => {
      if (!isMounted.value && (modelValue || innerValue)) {
        isMounted.value = true
      }
    })

    const onClickOut = () => {
      if (!props.clickOut) return

      if (props.modelValue === undefined) {
        innerValue.value = false
      } else {
        emit('update:modelValue', false)
      }
    }

    const onDocumentClick = (e: MouseEvent) => {
      if (e.bubbles && !isVisible.value) return

      const target = e.target as HTMLElement

      if (!target.closest(`.${COMPONENT_CLASS}`)) {
        onClickOut()
      }
    }

    watch(isVisible, (value) => {
      setTimeout(() => {
        if (value) {
          document.addEventListener('click', onDocumentClick)
        } else {
          document.removeEventListener('click', onDocumentClick)
        }
      }, 0)
    })

    onUnmounted(() => {
      document.removeEventListener('click', onDocumentClick)
    })

    const genBackdrop = () => {
      if (props.removeBackdrop) return null

      const backdrop = (
        <div
          v-show={isVisible.value}
          class={{
            [`${COMPONENT_CLASS}-backdrop`]: true,
            [`${COMPONENT_CLASS}-backdrop--active`]: isVisible.value
          }}
        />
      )

      if (props.disableMotion) return backdrop

      return (
        <Transition
          appear
          name={props.backdropTransition}
        >
          {backdrop}
        </Transition>
      )
    }

    const genContent = () => {
      const modal = (
        <div
          v-show={isVisible.value}
          class={classes.value}
          style={style.value}
        >
          {slots.default!()}
        </div>
      )

      if (props.disableMotion) return modal

      return (
        <Transition
          appear
          name={props.contentTransition}
        >
          {modal}
        </Transition>
      )
    }

    const genWrapper = () => (
      <div class={`${COMPONENT_CLASS}-wrapper`}>
        {genContent()}
      </div>
    )

    const genModal = () => {
      if (!isMounted.value) return null

      return (
        <Teleport to={props.teleportTarget}>
          {genBackdrop()}
          {genWrapper()}
        </Teleport>
      )
    }

    if (slots.activator) {
      const slotProps = {
        onClick: () => {
          if (props.modelValue === undefined) {
            innerValue.value = !innerValue.value
          } else {
            emit('update:modelValue', !props.modelValue)
          }
        }
      }

      return () => (
        <>
          {slots.activator!(slotProps)}
          {genModal()}
        </>
      )
    }

    return genModal
  }
})
