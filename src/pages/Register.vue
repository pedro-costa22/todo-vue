<script setup lang="ts">
import { ref, watch } from 'vue';
import BaseContainer from "../components/BaseContainer.vue";
import { IUser } from '../types/user';
import { create } from '../services/auth';
import { useRouter } from 'vue-router';

const router = useRouter();

const user = ref<IUser>({
  name: '',
  email: '',
  password: ''
});

const popUp = ref({
  open: false,
  message: '',
  status: ''
});

const errors = ref({
  name: false,
  email: false,
  password: false,
});

function handleError(key: string, value: boolean) {
  errors.value = { 
    ...errors.value, 
    [key]: value 
  }
}

async function createUser() {
  if(user.value.name == '') return handleError('name', true);
  if(user.value.email == '') return handleError('email', true);
  if(user.value.password == '') return handleError('password', true);

  try {
    const response  = await create(user.value);

    if(response?.status == 201) {
      popUp.value = {
        open: true,
        message: response?.data?.message
      }

      router.push('/tasks');
    } else {
      popUp.value = {
        open: true,
        message: response?.response?.data?.error
      }
    };
  } catch (error) {
    console.log('error', error);
  }
}

watch(popUp, () => {
  if(popUp.value.status == 201) {
    return alert(`${popUp.value.message}`);
  }

  return alert(`${popUp.value.message}`);
}, {
  deep: true,
});


</script>

<template>
  <BaseContainer>
    <template v-slot:children>
      <div class="container-login">

        <div class="title">
          <h2>Criar conta</h2>
        </div>

        <div class="container-inputs">
          <div class="email">
            <label>Nome: </label>
            <input type="text" placeholder="Digite seu nome" v-model="user.name" :class="{ 'input-error': errors.name }" @click="handleError('name', false);"/>
          </div>
          <div class="email">
            <label>Email: </label>
            <input type="email" placeholder="Digite seu email" v-model="user.email" :class="{ 'input-error': errors.email }" @click="handleError('email', false);"/>
          </div>
          <div class="password">
            <label>Senha: </label>
            <input type="password" placeholder="Digite sua senha" v-model="user.password" :class="{ 'input-error': errors.password }" @click="handleError('password', false);"/>
          </div>
        </div>

        <div class="login-container">
          <button @click="createUser">Criar</button>
          <span>
            Já possui uma conta? <RouterLink to="/" class="link">Acessar</RouterLink> 
          </span>
        </div>
      </div>
    </template>
  </BaseContainer>
</template>

<style lang="scss" scoped>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,200;0,500;0,600;0,700;0,800;1,500&display=swap');

  .container-login {
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    width: 400px;
    height: 70vh;
    border-radius: 12px;
    background: rgba(39, 38, 87, 0.55);
    padding: 24px;
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border: 2px solid rgba(160, 159, 159, 0.3);
    box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
    font-family: 'Montserrat', sans-serif;

    .title h2{
      color: #ffffff;
      font-family: 'Montserrat', sans-serif;
    }

    .container-inputs {
      width: 100%;
    }

    .email, .password {
      display: flex;
      flex-direction: column;
      width: 100%;
      margin: 16px 0px;

      label {
        color: #b9b9b9;
      }

      input {
        padding: 12px;
        border: none;
        margin: 4px 0px;
        color: #b9b9b9;
        background: transparent;
        outline: none;
        border: 1px solid rgba(255, 255, 255, 0.3);
        border-radius: 8px;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;

        &:focus {
          outline: 1px solid rgba(255, 255, 255, 0.3);
        }
      }
    }


    .login-container {
      width: 100%;
      display: flex;
      flex-direction: column;

      button {
        width: 100%;
        background: rgb(133,58,226);
        padding: 12px;
        color: #fff;
        border: none;
        border-radius: 8px;
        outline: none;
        font-family: 'Montserrat', sans-serif;
        cursor: pointer;
        margin-right: 16px;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        transition: all .2s ease;

        &:hover {
          background: rgb(226, 58, 226);
        }
      }

      span {
        margin-top: 8px;
        color: #fff;

        .link {
          color: rgb(226, 58, 226);
        }


      }
    }

    .input-error {
      border: 1px solid red !important;
    }
  
  }

</style>
