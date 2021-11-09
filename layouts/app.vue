<template>
  <div>
    <the-header />
    <Nuxt />
  </div>
</template>

<script>
import TheHeader from "~/components/navigation/TheHeader";

export default {
  name: "app.vue",
  components: { TheHeader },
  middleware: ['check-auth'],
};
</script>

<style scoped>

</style>
