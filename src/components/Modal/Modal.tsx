import './Modal.scss'
import {
  computed,
  defineComponent,
  Teleport,
  ref,
  watch,
  Transition,
  onUnmounted,
  nextTick
} from 'vue'

import { getScrollbarWidth } from '../../utils'
import { getDefaultProp } from '../../default-props'

const COMPONENT_CLASS = 'vue-neat-modal'

export default defineComponent({
  inheritAttrs: false,

  emits: [
    'after-enter',
    'after-leave',
    'update:modelValue'
  ],

  props: {
    modelValue: {
      type: Boolean,
      default: undefined
    },

    alignX: {
      type: String,
      validator: (v: string) => ['left', 'center', 'right'].includes(v),
      default: () => getDefaultProp('alignX')
    },

    alignY: {
      type: String,
      validator: (v: string) => ['top', 'center', 'bottom'].includes(v),
      default: () => getDefaultProp('alignY')
    },

    noSpacing: {
      type: Boolean,
      default: () => getDefaultProp('noSpacing')
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

    modalTransition: {
      type: String,
      default: () => getDefaultProp('modalTransition')
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

    const setVisibility = (value: boolean) => {
      if (props.modelValue === undefined) {
        innerValue.value = value
      } else {
        emit('update:modelValue', value)
      }
    }

    const modalStyle = computed(() => ({
      width: props.width,
      maxWidth: props.maxWidth
    }))

    const modalClasses = computed(() => [
      COMPONENT_CLASS,
      props.fullscreen && `${COMPONENT_CLASS}--fullscreen`,
      props.noSpacing && `${COMPONENT_CLASS}--no-spacing`,
      props.modalClass
    ])

    const wrapperBaseClass = `${COMPONENT_CLASS}-wrapper`
    const wrapperClasses = computed(() => [
      wrapperBaseClass,
      `${wrapperBaseClass}--x-${props.alignX}`,
      `${wrapperBaseClass}--y-${props.alignY}`,
      props.wrapperClass
    ])

    const backdropClasses = computed(() => [
      `${COMPONENT_CLASS}-backdrop`,
      isVisible.value && `${COMPONENT_CLASS}-backdrop--active`,
      props.backdropClass
    ])

    const disableScroll = () => {
      document.body.classList.add(`${COMPONENT_CLASS}-open`)
      document.body.style.paddingRight = `${getScrollbarWidth()}px`
    }

    const enableScroll = () => {
      document.body.classList.remove(`${COMPONENT_CLASS}-open`)
      document.body.style.paddingRight = ''
    }

    watch([() => props.modelValue, innerValue], (modelValue, innerValue) => {
      if (!isMounted.value && (modelValue || innerValue)) {
        isMounted.value = true
      }
    })

    watch(isVisible, (value) => {
      nextTick(() => {
        if (!value) return

        disableScroll()
      })
    })

    const onClickOut = () => {
      if (!props.clickOut) return
      setVisibility(false)
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
      enableScroll()
    })

    const onBackdropAfterLeave = () => {
      enableScroll()
      emit('after-leave')
    }

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
          onAfterLeave={onBackdropAfterLeave}
        >
          {backdrop}
        </Transition>
      )
    }

    const defaultSlotProps = {
      close: () => setVisibility(false)
    }

    const genModal = () => {
      const modal = (
        <div
          v-show={isVisible.value}
          class={modalClasses.value}
          style={modalStyle.value}
        >
          {slots.default!(defaultSlotProps)}
        </div>
      )

      if (props.disableMotion) return modal

      return (
        <Transition
          appear
          name={props.modalTransition}
          onAfterEnter={() => emit('after-enter')}
        >
          {modal}
        </Transition>
      )
    }

    const genWrapper = () => (
      <div class={wrapperClasses.value}>
        {genModal()}
      </div>
    )

    const genTeleport = () => {
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
        onClick: () => setVisibility(!isVisible.value)
      }

      return () => (
        <>
          {slots.activator!(slotProps)}
          {genTeleport()}
        </>
      )
    }

    return genTeleport
  }
})
