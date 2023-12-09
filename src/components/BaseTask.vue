<script setup lang="ts">
import { ref, defineProps } from 'vue';

const props = defineProps<{
  name: string,
  category: string,
  pending: boolean,
  id: number
}>();

const completedTask = ref(false);

</script>

<template>
  <div class="task-box">
    <div class="title-box">
      <input type="checkbox" v-model="completedTask" class="checkbox"/>
      <span class="title"> {{ props.name }}</span>
    </div>
    <div class="category-box">
      <span>{{ props.category }}</span>
    </div>
    <div class="actions">
      <button>Deletar</button>
    </div>
  </div>

</template>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,200;0,500;0,600;0,700;0,800;1,500&display=swap');

  .task-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 8px;
    padding: 12px 16px;
    border-radius: 10px;
    transition: all .3s ease;
    cursor: pointer;
  }

  .task-box:hover {
    background: rgba(160, 159, 159, 0.11);
  }

  .title {
    color: #bbb9c8;
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
    margin-left: 8px;
  }

  .title-box {
    display: flex;
    align-items: center;
    width: 60%;
  }

  .category-box {
    width: 30%;
    color: #bbb9c8;
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
  }

  .actions {
    width: 10%;
  }

  .actions button {
    width: 100%;
    padding: 8px;
    background: rgb(133,58,226);
    color: #fff;
    border: none;
    border-radius: 8px;
    outline: none;
    font-family: 'Montserrat', sans-serif;
    cursor: pointer;
  }
  
</style>
