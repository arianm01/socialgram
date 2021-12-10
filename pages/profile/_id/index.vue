<template>

</template>

<script>
export default {
  name: "index",
  layout: 'app',
  data(){
    return {
      isItMe: false,
      id: null,
    }
  },
  created() {
    this.id=parseInt(this.$route.params.id);
     if (this.id===this.$store.getters.user.ID)
      this.isItMe=true;
    console.log(this.isItMe);
  }
};
</script>

<style scoped>

</style>
