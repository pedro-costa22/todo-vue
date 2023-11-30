<script setup lang="ts">

</script>

<template>
  <section class="container">
    <slot name="children"></slot>
  </section>
</template>

<style lang="scss" scoped>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
  }
</style>