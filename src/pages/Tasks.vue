<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import BaseContainer from '../components/BaseContainer.vue';
import { getUserLocalStorage } from '../services/utils';
import Box from '../components/Box.vue';

const router = useRouter();

onBeforeMount(() => {
  if (!getUserLocalStorage()) {
    router.push('/404');
  }
});


</script>

<template>
  <BaseContainer>
    <template v-slot:children>
      <Box />
    </template>
  </BaseContainer>
</template>

<style scoped>

</style>
