<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ITask from './types/task.d.ts';
import BaseUser from '../components/BaseUser.vue';
import { getAllCategories } from '../services/category';
import { createTask } from '../services/task';

  const task = ref<ITask>({
    name: '',
    category: '',
    description: '',
    pending: true
  });

  const tasks = ref([]);
  const categories  = ref([]);

  async function addTask() {
    if(task.value.name == '') return alert('Erro, necessário informar um nome para a tarefa');
    if(task.value.category == '') return alert('Erro, necessário selecionar uma categoria');
    if(task.value.description == '') return alert('Erro, necessário informar uma descrição para a tarefa');
  
    try {
      const resp = await createTask({
        name: task.name as string,
        description: task.description as string,
        categoryId: task.category as string
      });

      console.log(resp);
      
    } catch (error) {
      console.log(error);
    }
  
  }

  async function fetchCategories() {
    try {
      const resp = await getAllCategories();
      if(resp.status == 200) {
        const categoriesFk = resp.data.map((item: any) => ({
          id: item.id,
          name: item.name,
        }));
        categories.value = categoriesFk;
      }

    } catch (error) {
      console.log(error);
    }
  }

  onMounted(() => {
    fetchCategories();
  });

</script>

<template>
  <div class="box">
    <div class="add-box">
      <!-- name -->
      <input 
        class="input"
        type="text" 
        placeholder="Informe o nome da tarefa" 
        v-model="task.name"
      />

      <!-- description -->
      <input 
        class="input"
        type="text" 
        placeholder="Descrição da tarefa" 
        v-model="task.description"
      />

      <!-- category -->
      <select class="select" v-model="task.category">
        <option value="" selected>Selecione uma categoria</option>
        <option v-for="op in categories" :key="op.id" :value="op.id"> {{ op.name }}</option>
      </select>

      <button @click="addTask">Criar</button>
    </div>

    <div class="task-itens">
      <BaseTask v-for="tks in tasks" :key="tks.name"
        :name="tks.name"
        :category="tks.category"
        :pending="tks.pending"
      />
    </div>

    <div class="user_config">
      <BaseUser />
    </div>
      
  </div>
  
</template>

<style lang="scss" scoped>
  .task-itens {
    overflow-y: auto;
    max-height: 80%;

    &::-webkit-scrollbar-track {
      background: transparent;
    }
    &::-webkit-scrollbar {
      width: 2px;
      background: transparent;
    }
    &::-webkit-scrollbar-thumb {
      background: rgb(133,58,226);
    }
  }

</style>
