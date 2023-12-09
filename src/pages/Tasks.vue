<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';
import BaseContainer from '../components/BaseContainer.vue';
import { getUserLocalStorage } from '../services/utils';
import Box from '../components/Box.vue';
import BoxCategory from '../components/BoxCategory.vue';

const router = useRouter();

const changeVisibilityPage = ref({
  task: true, 
  category: false
});

function handleChangeVisibility(open: string, close: string) {
  changeVisibilityPage.value = {
    ...changeVisibilityPage, 
    [close]: false,
    [open]: true
  }
}

onBeforeMount(() => {
  if (!getUserLocalStorage()) {
    router.push('/404');
  }
});

</script>

<template>
  <BaseContainer>
    <template v-slot:children>
      <div class="menu">
        <div>
          <span @click="handleChangeVisibility('task', 'category')" :class="{ 'activePage' : changeVisibilityPage.task}">Tarefas</span>
          <span @click="handleChangeVisibility('category', 'task')" :class="{ 'activePage' : changeVisibilityPage.category}">Categorias</span>
        </div>
      </div>
      <Box v-show="changeVisibilityPage.task"/>
      <BoxCategory v-show="changeVisibilityPage.category" />
    </template>
  </BaseContainer>
</template>

<style lang="scss" scoped>

  .menu {
    display: flex;
    justify-content: end;
    width: 1170px;

    div {
      display: flex;
      justify-content: space-between;
      width: 170px;
      margin-bottom: 8px;

      span {
        color: #fff;
        cursor: pointer;
        transition: .2s all ease;

        &:hover {
          color: rgb(226, 58, 212);
        }
      }
    }

    .activePage {
      color: aqua !important;
    }
    
  }

</style>


