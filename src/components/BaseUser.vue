<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { getUserLocalStorage, setUserLocalStorage } from '../services/utils';

import { useRouter } from 'vue-router';

const router = useRouter();

const userName = getUserLocalStorage()?.name;

function logoff() {
  setUserLocalStorage(null);

  router.push('/');
}

</script>

<template>
  <div class="box-user">
    <div class="user_infos"> 
      <span>
        <Icon 
          icon="bx:user" 
          width="28" 
          height="28" 
          color="white"
        />
      </span>
      <span class="name-user">{{ userName }}</span>
    </div>
    <div class="btn-logoff" @click="logoff"> 
      <Icon 
        icon="fluent:arrow-exit-20-filled" 
        color="white" 
        width="28" 
        height="28"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .box-user {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0px 24px;

    .user_infos {
      display: flex;
      align-items: center;
    }

    .name-user {
      color: #fff;
      margin-left: 8px;
    }

    .btn-logoff {
      cursor: pointer;
    }
  }
  
</style>
