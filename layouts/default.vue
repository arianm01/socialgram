<template>
  <Nuxt />
</template>

<script>
export default {
  name: "default.vue",
  middleware: ['check-auth','dash']
};
</script>

<style scoped>

</style>
