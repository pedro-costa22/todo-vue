  <script setup lang="ts">
  import { ref, onMounted, reactive } from 'vue';
  import BaseUser from './BaseUser.vue';
  import { createCategory, getAllCategories } from '../services/category';
  import BaseCategory from './BaseCategory.vue';

  const nameCategory = ref({name: ''});
  const categories = reactive([]);

  async function addCategory() {
    if (nameCategory.value.name === '') return alert('Necessário informar um nome para a categoria');

    try {
      const resp = await createCategory(nameCategory.value);
      
      if (resp.status === 201) {
          categories.push({
            id: resp.data.newCategory.id,
            name: resp.data.newCategory.name,
          });
        nameCategory.value.name = '';
      } else {
        alert(resp.response.data.error);
        nameCategory.value.name = '';
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchCategories() {
    try {
      const resp = await getAllCategories();
      if (resp.status === 200) {
        const categoriesFk = resp.data.map((item: any) => ({
          id: item.id,
          name: item.name,
        }));

        categories.length = 0;
        categories.push(...categoriesFk);
      }
    } catch (error) {
      console.log(error);
    }
  };

function delCategory(id) {
  const index = categories.findIndex((item) => item.id === id);
  if (index !== -1) {
    categories.splice(index, 1);
  }
}

  function updateCategories(newCategory) {
    const index = categories.findIndex(item => item.id === newCategory.id);
    if (index !== -1) {
      categories[index] = {
        id: newCategory.id,
        name: newCategory.name,
      };
    }
  }

  onMounted(() => {
    fetchCategories();
  });

  </script>

  <template>
    <div class="box">
      <div class="add-box">
        <input 
          class="input"
          type="text" 
          placeholder="Informe o nome da categoria" 
          v-model="nameCategory.name"
        />
        <button @click="addCategory">Criar</button>
      </div>

      <div class="task-itens">
        <BaseCategory  
            v-for="category in categories" :key="category.id"
            :name="category.name"
            :id="category.id"
            :updateCategories="updateCategories"
            :delCategory="delCategory"
          />
      </div>

      <div class="user_config">
        <BaseUser />
      </div>
        
    </div>
  </template>

  <style lang="scss"  scoped>
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
