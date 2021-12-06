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
  middleware: ['check-auth','auth'],
  created (){
    if (!this.$store.getters.user)
      this.$axios.$get(process.env.baseURL + "profile?user_id=0", {
        headers: {
          "Authorization": "Bearer " + this.$store.getters.token
        }
      }).then(response => {
        this.$store.commit('setUser',response);
      });
  }
};
</script>

<style scoped>

</style>
