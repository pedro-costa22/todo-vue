<script setup lang="ts">
import { ref } from 'vue';
import ITask from './types/task.d.ts';


  const task = ref<ITask>({
    name: '',
    category: '',
    pending: true
  });

  const tasks = ref([]);

  function addTask() {
    if(task.value.name == '') return alert('Erro, necessário informar um nome para a tarefa');
    if(task.value.category == '') return alert('Erro, necessário selecionar uma categoria');

    tasks.value.push({ ...task.value } as ITask);

    task.value.name = '';
    task.value.category = '';

    return alert('Tarefa cadastrada com sucesso');
  }

</script>

<template>
  <div class="box">
    <div class="add-box">
      <input 
        class="input"
        type="text" 
        placeholder="Informe o nome da tarefa" 
        v-model="task.name"
      />
      <select class="select" v-model="task.category">
        <option value="" selected>Selecione uma categoria</option>
        <option v-for="op in categories" :key="op.id" :value="op.name"> {{ op.name }}</option>
      </select>
      <button @click="addTask">Criar</button>
    </div>

    <div>
      <BaseTask v-for="tks in tasks" :key="tks.name"
        :name="tks.name"
        :category="tks.category"
        :pending="tks.pending"
      />

    </div>
      
  </div>
  
</template>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,200;0,500;0,600;0,700;0,800;1,500&display=swap');
  .box {
    display: flex;
    flex-direction: column;
    width: 1170px;
    height: 70vh;
    border-radius: 12px;
    background: rgba(39, 38, 87, 0.55);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border: 2px solid rgba(160, 159, 159, 0.3);
    box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  }

  .add-box {
    display: flex;
    justify-content: space-between;
    gap: 2;
    height: 40px;
    padding: 8px;
    border-bottom: 1px solid rgba(160, 159, 159, 0.3);
  }

  .input {
    display: flex;
    width: 60%;
    background: transparent;
    border: none;
    outline: none;
    padding-left: 16px;
    color: #bbb9c8;
    font-family: 'Montserrat', sans-serif;
  }

  .select {
    width: 30%;
    background: transparent;
    border: 1px solid rgba(160, 159, 159, 0.3);
    border-radius: 8px;
    outline: none;
    color: #bbb9c8;
    font-family: 'Montserrat', sans-serif;
    padding: 0px 4px;
  }

  .add-box button {
    width: 10%;
    background: rgb(133,58,226);
    color: #fff;
    border: none;
    border-radius: 8px;
    outline: none;
    margin-left: 8px;
    font-family: 'Montserrat', sans-serif;
    cursor: pointer;
    margin-right: 16px;
  }
</style>
