import { Modal } from 'vue-neat-modal'
import '../dist/vue-neat-modal.css'
import './App.css'

export default {
  name: 'App',

  components: { Modal },

  data: () => ({
    example1: false,
    example2: false
  }),

  render () {
    return (
      <>
        <Modal
          v-model={this.example1}
          v-slots={{
            activator: (props) => (
              <button {...props}>
                Basic
              </button>
            )
          }}
        >
          <div class="card">
            <h1 class="card__title">
              Modal content
            </h1>

            <p class="card__text">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores nisi consectetur sequi molestias animi eveniet laboriosam quibusdam omnis, quam sed sapiente cum quia fugiat. Temporibus illo similique optio expedita perferendis?
            </p>

            <button onClick={() => { this.example1 = false }}>
              Close
            </button>
          </div>
        </Modal>

        <Modal
          v-model={this.example2}
          fullscreen
          contentTransition="move-up"
          remove-backdrop
          v-slots={{
            activator: (props) => (
              <button {...props}>
                Fullscreen
              </button>
            )
          }}
        >
          <div class="card">
            <h1 class="card__title">
              Fullscreen
            </h1>

            <button onClick={() => { this.example2 = false }}>
              Close
            </button>
          </div>
        </Modal>
      </>
    )
  }
}
