<template>
  <div>
    <the-header />
    <Nuxt />
    <the-footer />
  </div>
</template>

<script>
import TheHeader from "~/components/navigation/TheHeader";
import TheFooter from "~/components/navigation/TheFooter";

export default {
  name: "app.vue",
  components: {TheFooter, TheHeader },
  middleware: ['check-auth','auth'],
  async beforeCreate (){
      const user = await this.$axios.$get(process.env.baseURL + "profile?user_id=0", {
        headers: {
          "Authorization": "Bearer " + this.$store.getters.token
        }
      });
      await this.$store.commit('setUser', user);
    }
};
</script>

<style scoped>

</style>
d
