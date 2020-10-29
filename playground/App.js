import { Modal } from '../'
import '../dist/vue-neat-modal.css'
import './App.css'

export default {
  name: 'App',

  render () {
    return (
      <Modal
        maxWidth="500px"
        v-slots={{
          activator: (props) => (
            <button {...props}>
                Basic
            </button>
          ),

          default: ({ close }) => (
            <div class="card">
              <h1 class="card__title">
                  Modal content
              </h1>

              <p class="card__text">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores nisi consectetur sequi molestias animi eveniet laboriosam quibusdam omnis, quam sed sapiente cum quia fugiat. Temporibus illo similique optio expedita perferendis?
              </p>

              <button onClick={close}>
                  Close
              </button>
            </div>
          )
        }}
      />
    )
  }
}
