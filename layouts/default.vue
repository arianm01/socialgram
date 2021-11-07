<template>
  <Nuxt />
</template>

<script>
export default {
  name: "default.vue",
  middleware: ['check-auth']
};
</script>

<style scoped>

</style>
