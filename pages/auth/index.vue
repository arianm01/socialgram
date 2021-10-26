<template>
  <div class="main h-screen w-full w-screen">
    <div class="grid left-side w-1/3 ">
      <img src="../../assets/logo/500ppi/Logo3.png" width="100">
      <div class="left-side-call justify-self-center " v-if="sizeScreen">
        <h1>Call a friend,</h1>
        <div class="call">
          <h1>Call</h1>
          <img src="../../assets/logo/500ppi/Logo5.png" class="logo-call">
        </div>
      </div>
      <div class="left-side-image mt-10">
        <img src="../../assets/pics/Saly-10(1).png" alt="saly">
      </div>
    </div>
    <div class="right-side w-2/3">
      <h1>Right Side</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      size: null,
      sizeScreen: true
    };
  },

  watch: {
    sizeScreen() {
      console.log(this.size > 500);
      return this.size > 500;
    }
  },

  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
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
.main{
  display: flex;
}
.right-side{
  background-color:#21343b;
}
.left-side {
  font-size: 40px;
  padding: 2%;
  background-color: #b0d8da;
}

.left-side img{
  /*margin-bottom: 30%;*/
}
.left-side-image{
  margin-top: -50px;
  padding: 10%;
  top: -50px;
}

.left-side-call {
  /*padding-top: 15%;*/
  /*margin-left: 10%;*/
  padding-top: 20%;
  margin-bottom: 0;
}

.logo-call {
  width: 150px;
  margin-left: 3%;
}

.call {
  display: flex;
}
@media only screen and (max-width: 750px) {
  /* For mobile phones: */
  .main{
    display: grid;
  }
}
</style>
