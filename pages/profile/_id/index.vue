<template>

</template>

<script>
export default {
  name: "index",
  layout: 'app',
  created() {
    console.log(this.$route.params.id);
  }
};
</script>

<style scoped>

</style>
