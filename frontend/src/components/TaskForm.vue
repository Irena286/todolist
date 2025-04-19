<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {
      isModalOpen: false,
      newTask: {
        content: '',
        time: ''
      }
    };
  },
  methods: {
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    submitForm() {
      this.$emit('add-task', this.newTask);
      this.newTask = { content: '', time: '' };
      this.closeModal();
    }
  }
});
</script>

<template>
  <div>  
    <div v-if="isModalOpen" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <h2 class="text-xl font-semibold mb-4 mt-0">Add New Task</h2>
        <form @submit.prevent="submitForm">
          <input
            v-model="newTask.content"
            type="text"
            placeholder="Task Content"
            class="input-field"
            required
          />
          <input
            v-model="newTask.time"
            type="datetime-local"
            class="input-field"
            required
          />
          <div class="button-container">
            <button type="submit" class="submit-btn">Add Task</button>
            <button type="button" class="close-btn" @click="closeModal">Cancel</button>
          </div>
        </form>
      </div>
    </div>
   
    <button @click="openModal" class="btn-grad">
      Add Task
    </button>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;
}

.modal-overlay button:hover {
  cursor: pointer;
}

.modal-content {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
}

.input-field {
  display: block;
  width: 95.8%;
  margin-bottom: 1rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.button-container {
  display: flex;
  justify-content: space-between;
}

.submit-btn {
  background-color: #3b82f6;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
}

.close-btn {
  background-color: #e5e7eb;
  color: #111827;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
}

.btn-grad {
  position: absolute;
  top: 18px;
  right: 21px;
  background-image: linear-gradient(to right, #77A1D3 0%, #79CBCA 51%, #77A1D3 100%);
  margin: 10px;
  padding: 14px 42px;
  font-size: 12px;
  font-weight: 700;
  text-align: center;
  text-transform: uppercase;
  transition: background-position 0.5s, color 0.5s;
  background-size: 200% auto;
  color: white;
  box-shadow: 0 0 20px #eee;
  border-radius: 5px;
  border: 0;
  display: block;
  cursor: pointer;
}

.btn-grad:hover {
  background-position: right center; 
  color: #fff;
  text-decoration: none; 
}

h2 {
  margin-top: 0
}
</style>
