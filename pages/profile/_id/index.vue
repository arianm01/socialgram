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
  async created() {
    this.id=parseInt(this.$route.params.id);
    if (!this.$store.getters.user) {
      const user = await this.$axios.$get(process.env.baseURL + "profile?user_id=0", {
        headers: {
          "Authorization": "Bearer " + this.$store.getters.token
        }
      });
      await this.$store.commit('setUser', user);
    }
     if (this.id===this.$store.getters.user.ID)
      this.isItMe=true;
    console.log(this.isItMe);
  }
};
</script>

<style scoped>

</style>
