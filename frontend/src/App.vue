<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import TaskForm from './components/TaskForm.vue';
import TaskList from './components/TaskList.vue';

interface Task {
  _id: string;
  content: string;
  time: string;
}

export default defineComponent({
  components: {
    TaskForm,
    TaskList
  },
  setup() {
    const tasks = ref<Task[]>([]);

    const fetchTasks = async () => {
      const res = await fetch('http://localhost:3000/tasks');
      tasks.value = await res.json();
    };

    const addTask = async (newTask: { content: string; time: string }) => {
      const response = await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask)
      });
      const addedTask: Task = await response.json();
      tasks.value.push(addedTask);
    };

    onMounted(() => {
      fetchTasks();
      gsap.from(".title", { opacity: 0, x: -20, duration: 1 });
    });

    return {
      tasks,
      addTask
    };
  }
});
</script>

<template>
  <div class="app-container">
    <h1 class="title">To-Do List</h1>
    <TaskForm @add-task="addTask" />
    <TaskList :tasks="tasks" />
  </div>
</template>

<style>
body {
  background: #d8ecf0;
}

.app-container {
  position: relative;
  font-family: sans-serif;
  max-width: 600px;
  margin: 30px auto;
  padding: 2rem;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 1.8rem;
  margin-top: 0;
  font-weight: 700;
  color: #333;
  margin-bottom: 3rem;
}

button {
  background-color: #4CAF50;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

input {
  padding: 0.5rem;
  margin: 0.5rem 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
}

form {
  display: flex;
  flex-direction: column;
}
</style>
