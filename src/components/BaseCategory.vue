<script setup lang="ts">
import { ref, defineProps, onMounted } from 'vue';
import { updateCategory, deleteCategory} from '../services/category';

const props = defineProps<{
  name: string,
  id: number,
  updateCategories: () => void,
  delCategory: () => void,
}>();

const isNotEdit = ref(true);
const name = ref({name: ''});
const nameUpdated = ref({name: ''});

function openEdit() {
  isNotEdit.value = false;
}

function closeEdit() {
  isNotEdit.value = true;
  name.value = nameUpdated.value.name  == '' ? props.name : nameUpdated.value;
}

async function editCategory() {
  if(name.value == '') return alert('O novo nome não pode ser null');

  try {
    const resp = await updateCategory(props.id, {newName: name.value});

    if(resp.status == 200) {
      nameUpdated.value = resp.data.newCategory.name;
      props.updateCategories(resp.data.newCategory);
      closeEdit();
    }

  } catch (error) {
    console.log(error);
  }
}

async function deleteCat() {
  try {
    const resp = await deleteCategory(props.id);
    if(resp.status == 200) {
      alert('Categoria deletada com sucesso'); 
      props.delCategory(props.id); 
    }
  } catch (error) {
    console.log(error);
  }
}

onMounted(() => {
  name.value = props.name;
});


</script>

<template>
  <div class="category-box">
    <div class="category-title">
      <input type="text" v-model="name" :readonly="isNotEdit" class="input"/>

      <div v-show="!isNotEdit">
        <button class="button-default save" @click="editCategory">Salvar</button>
      </div>
    </div>
    <div class="category-actions">
      <button @click="openEdit" class="button-default edit" v-if="isNotEdit">Editar</button>
      <button @click="closeEdit"  class="button-default edit" v-if="!isNotEdit">Cancelar</button>
      <button @click="deleteCat" class="button-default delete">Deletar</button>
    </div>
  </div>

</template>

<style lang="scss" scoped>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,200;0,500;0,600;0,700;0,800;1,500&display=swap');

  .category-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 8px;
    padding: 12px 16px;
    border-radius: 10px;
    transition: all .3s ease;
    cursor: pointer;

    &:hover {
      background: rgba(160, 159, 159, 0.11);
    }

    .category-title {
      display: flex;
      justify-content: space-between;
      width: 80%;

      .save {
        width: 100%;
        padding: 8px;
        background: rgb(133,58,226);
      }
    }

    .button-default {
        background: none;
        width: 40%;
        border: none;
        padding:8px 4px;
        cursor: pointer;
        border-radius: 4px;
        color: #fff;
        font-family: 'Montserrat', sans-serif;
    }

    .category-actions {
      display: flex;
      justify-content: flex-end;
      gap: 1;
      width: 20%;

      .edit {
        background: rgb(133,58,226);
      }

      .delete {
        background: rgb(226, 58, 58);
        margin-left: 8px;
      }
    }
  }



  
</style>
