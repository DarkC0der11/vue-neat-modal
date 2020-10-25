import { Modal } from 'vue-neat-modal';
import '../dist/vue-neat-modal.css';
import './App.css';

export default {
  name: 'App',

  components: { Modal },

  data: () => ({
    isVisible: false,
  }),

  render() {
    return (
      <>
        <button onClick={() => { this.isVisible = true; }}>
          Show Modal
        </button>

        <Modal 
          v-model={this.isVisible}
          contentTransition="scale"
        >
          <div class="card">
            <h1 class="card__title">
              Modal content
            </h1>

            {[...Array(5).keys()].map(() => (
              <p class="card__text">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores nisi consectetur sequi molestias animi eveniet laboriosam quibusdam omnis, quam sed sapiente cum quia fugiat. Temporibus illo similique optio expedita perferendis?
              </p>
            ))}

            <button onClick={() => this.isVisible = false}>
              Close
            </button>
          </div>
        </Modal>
      </>
    )
  }
}