<script lang="ts">
import Vue from 'vue';
import { gsap } from "gsap";

interface Task {
  _id: string;
  content: string;
  time: string;
}

export default Vue.extend({
  props: {
    tasks: {
      type: Array as () => Task[],
      required: true
    }
  },
  methods: {
    formatDateTime(datetimeString: string): string {
      const date = new Date(datetimeString);
      return date.toLocaleString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    },
    animateTasks(): void {
      this.$nextTick(() => {
        if (this.tasks.length) {
          gsap.from(".task-item", {
            opacity: 0,
            y: 20,
            stagger: 0.1,
            duration: 1
          });
        }
      });
    }
  },
  watch: {
    tasks() {
      this.animateTasks();
    }
  },
  mounted() {
    this.animateTasks();
  }
});
</script>


<template>
  <div class="container mx-auto p-4 relative">
    <div>
      <ul>
        <li
          v-for="task in tasks"
          :key="task._id"
          class="task-item"
        >
        <div class="task-content-wrapper">
          <span class="task-content">{{ task.content }}</span>
          <span class="task-time">{{ formatDateTime(task.time) }}</span>
        </div>
        </li>
      </ul>
    </div>
  </div>
</template>


<style scoped>

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
 
ul li {
  margin-bottom: 10px;
  color: #222;
}

.task-item {
  background: linear-gradient(135deg, #f0f4ff, #e8f0fe);
  padding: 1rem;
  border-radius: 4px;
  box-shadow: 0px 2px 1px rgb(192 210 243);
  margin: 0 0 12px 0; 
  font-size: 1rem;
  color: #333;
  list-style: none;
}
.task-item:last-child {
  margin-bottom: 0;
}

.task-item:hover {
  transform: translateY(-4px);
  box-shadow: 0px 2px 0px rgb(119 162 211);
  background: linear-gradient(135deg, #d4e0fc, #77a6d2e6);
}

.task-content-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.task-content {
  font-weight: 600;
  flex: 1;
}

.task-time {
  font-size: 0.87rem;
  margin-left: 1rem;
  white-space: nowrap;
  font-weight: 600;
  color: #344479;
}
.task-item:hover .task-time {
  color: white;
}

@media (max-width: 500px) {
  .title {
    margin-bottom: 1.7rem;
  }
  .task-content-wrapper {
    flex-direction: column;
    align-items: flex-start;
  }

  .task-time {
    margin-left: 0;
    margin-top: 0.5rem;
  }
}
@media screen and (max-width: 400px) { 
  .btn-grad {
    position: relative;
    right: 12px;
    top: 0;
    margin-bottom: 30px;
  }
}
</style>
