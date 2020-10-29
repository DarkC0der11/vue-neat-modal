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

import { getDefaultProp } from '../../default-props'

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
      default: () => getDefaultProp('eager')
    },

    clickOut: {
      type: Boolean,
      default: () => getDefaultProp('clickOut')
    },

    teleportTarget: {
      type: [String, HTMLElement],
      default: () => getDefaultProp('teleportTarget')
    },

    backdropTransition: {
      type: String,
      default: () => getDefaultProp('backdropTransition')
    },

    contentTransition: {
      type: String,
      default: () => getDefaultProp('contentTransition')
    },

    disableMotion: {
      type: Boolean,
      default: () => getDefaultProp('disableMotion')
    },

    removeBackdrop: {
      type: Boolean,
      default: () => getDefaultProp('removeBackdrop')
    },

    width: {
      type: String,
      default: () => getDefaultProp('width')
    },

    maxWidth: {
      type: String,
      default: () => getDefaultProp('maxWidth')
    },

    fullscreen: {
      type: Boolean,
      default: () => getDefaultProp('fullscreen')
    },

    wrapperClass: String,
    modalClass: String,
    backdropClass: String
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

    const classes = computed(() => [
      COMPONENT_CLASS,
      props.fullscreen && `${COMPONENT_CLASS}--fullscreen`,
      props.modalClass
    ])

    const wrapperClasses = computed(() => [
      `${COMPONENT_CLASS}-wrapper`,
      props.wrapperClass
    ])

    const backdropClasses = computed(() => [
      `${COMPONENT_CLASS}-backdrop`,
      isVisible.value && `${COMPONENT_CLASS}-backdrop--active`,
      props.backdropClass
    ])

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
      if (!isVisible.value) return

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
          class={backdropClasses.value}
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
      <div class={wrapperClasses.value}>
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
