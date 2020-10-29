# 💋 Vue Neat Modal

⚙️ Highly flexible and customizable Vue 3 Modal window component.

[Demos on CodeSandbox](https://codesandbox.io/s/vue-neat-modal-rw850?file=/src/App.vue) 

## 🔥 Why Vue Neat Modal ?

⬆️ The modal uses Vue 3 portal feature to detach modal to documents root, no
more `overflow: hidden;` and `z-index` hacks and limitations, nest it as much
as you want it will always work as expected.

🕹 This library gives you the core functionality of the Modal Window and exposes
an empty modal content slot where you can put whatever you want.

✨ No default card, button, title and e.t.c. is rendered as you may see in many other, 
modal component plugins, this gives possibility to render anything you like inside the modal,
no need for style overriding.

🔩 It offers a nice global props configuration so that you can set
common props for your projects modals so you don't repeat them everytime the modal is used.

There are much more exciting features, check the usage docs down below.

### Basic usage

Install: `npm install vue-neat-modal -S`

Import the styles in your main entry file
```js
  import 'vue-neat-modal/dist/vue-neat-modal.css'
```

Local component registration:
```js
  // Import the component
  import { Modal } from 'vue-neat-modal'

  export default {
    // Register it
    components: { Modal }
  }
```

Global registration:
```js
  // Import the component
  import { Modal } from 'vue-neat-modal'

  // Register it globally with default component name option 
  app.component(Modal.name, Modal)

  // Or register with custom name
  app.component('AppModal', Modal)
```

Usage, simplest without a model
```html
  <template>
    <Modal max-width="500px">
      <template #activator="props">
        <button v-bind="props">
          Open Modal
        </button>
      </template>

      <template #default="{ close }">
        <div>
          Modal Content

          <button @click="close">
            Close
          </button>
        </div>
      </template>
    </Modal>
  </template>
```

Usage with a model variable
```html
  <template>
    <Modal v-model="isOpen" max-width="500px">
      <div>
        Modal Content

        <button @click="isOpen = false">
          Close
        </button>
      </div>
    </Modal>
  
    <button @click="isOpen = !isOpen">Open Modal</button>
  </template>

  <script>
    export default {
      data: () => ({
        isOpen: false,
      })
    }
  </script>
```

You can use slot props for convienience, and still keep a model it is totally fine.
```html
  <template>
    <Modal max-width="500px" v-model="isOpen">
      <template #activator="props">
        <button v-bind="props">
          Open Modal
        </button>
      </template>

      <template #default="{ close }">
        <div>
          Modal Content

          <button @click="close">
            Close
          </button>
        </div>
      </template>
    </Modal>
  </template>

  <script>
    export default {
      data: () => ({
        isOpen: false,
      })
    }
  </script>
```

Feel free to mix and match slots / model control, everything is synced. For instance if you want you can remove activator, while still keeping the default slot prop which exposes a nice `close` method for convinience. Then you can toggle modal from anywhere else through model variable. 

### Props
| prop               | desc                                                                               | type                  | default   |
|--------------------|------------------------------------------------------------------------------------|-----------------------|-----------|
| modelValue         | Value which controls the visibility                                                | `boolean`               | `false`     |
| clickOut           | Whether click out closes the modal or not                                          | `boolean`               | `true`      |
| eager              | Controls whether component should mount immediately even if it has not been opened | `boolean`               | `false`     |
| teleportTarget     | Where should modal be detached to.                                                 | `string` \| `HTMLElement` | "#app"    |
| backdropTransition | Backdrop overlays transition                                                       | `string`                | `undefined` |
| modalTransition    | The modal content transition                                                       | `string`                | "scale"     |
| disableMotion      | Disable transition on `backdrop` and `modal`                                         | `boolean`               | `false`     |
| removeBackdrop     | Do not render `backdrop`                                                             | `boolean`               | `false`     |
| width              | The width css property of the `modal`                                              | `string`                | "auto"    |
| maxWidth | The max-width css property of the `modal`                                              | `string`                | "none"    |
| fullscreen | Makes content cover whole modal, and removes spacing | `boolean` | `false` |
| backdropClass | Add class to backdrop | `string` | `undefined` |
| wrapperClass | Add class to wrapper | `string` | `undefined` |
| modalClass | Add class to modal | `string` | `undefined` |

### Events
| name          | desc |                                                                      
|---------------|-----------------------------------------------|
| `after-enter` | Modal is fully opened and animations are ended 
| `after-leave` | Modal is fully hidden and animations are ended