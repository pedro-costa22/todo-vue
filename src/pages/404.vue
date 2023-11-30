<script setup lang="ts">
import BaseContainer from "../components/BaseContainer.vue";
</script>

<template>
  <BaseContainer>
    <template v-slot:children>
      <div class="">
        <div> 
          <img src="../assets/icons/undraw_secure_login_pdn4.svg" alt="Icone not found">
        </div>
        <div class="text">
          <span>
            Você não possui acesso para acessar essa página! 
          </span>
          <RouterLink to="/" class="link">Acesse sua conta para continuar</RouterLink> 
        </div>
      </div>
    </template>
  </BaseContainer>
</template>

<style lang="scss" scoped>
  .text {
    display: flex;
    flex-direction: column;
    text-align: center;
    color: #fff;
    margin-top: 28px;

    .link {
      color: rgb(252, 114, 252);
    }
  }

</style>
