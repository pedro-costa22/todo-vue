import { createRouter, RouteRecordRaw, createWebHistory } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../pages/Login.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../pages/Register.vue'),
  },
  {
    path: '/tasks',
    name: 'Tasks',
    component: () => import('../pages/Tasks.vue'),
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../pages/404.vue'),
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});