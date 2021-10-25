<template>
  <div class="left-side">
    <img src="../../assets/logo/500ppi/Logo3.png" width="100">
    <div class="left-side-call" v-if="sizeScreen">
    <h1>Call a friend,</h1>
      <div class="call">
        <h1>Call</h1>
        <img src="../../assets/logo/500ppi/Logo5.png" class="logo-call">
      </div>
     </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      size: null,
      sizeScreen:true,
    }
  },

  watch: {
    sizeScreen(){
      console.log(this.size > 500);
      return this.size > 500;
    }
  },

  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    })
  },

  methods: {
    onResize() {
      this.size = window.innerWidth;
      this.sizeScreen = this.size > 500;
    }
  }
};
</script>

<style scoped>
.left-side{
  font-size: 30px;
  padding: 3%;
  background-color: aquamarine;
}
.left-side-call{
  padding-top: 15%;
  margin-left: 10%;
}
.logo-call{
  width: 100px;
  padding-left: 1%;
}
.call{
  display: flex;
}
</style>
