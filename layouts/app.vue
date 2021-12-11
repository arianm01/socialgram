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
  async beforeCreate (){
    if (!this.$store.getters.user) {
      const user = await this.$axios.$get(process.env.baseURL + "profile?user_id=0", {
        headers: {
          "Authorization": "Bearer " + this.$store.getters.token
        }
      });
      await this.$store.commit('setUser', user);
    }
  }
};
</script>

<style scoped>

</style>
d
