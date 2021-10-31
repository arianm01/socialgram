<template>
  <div class="main h-screen">
    <div class="grid left-side w-1/3 ">
      <img src="../../assets/logo/500ppi/Logo3.png" class="logo" width="100" alt="logo">
      <div class="left-side-call justify-self-center ">
        <h1>Call a friend,</h1>
        <div class="call">
          <h1>Call</h1>
          <img src="../../assets/logo/500ppi/Logo5.png" class="logo-call" alt="socialgram">
        </div>
      </div>
      <div class="left-side-image mt-10">
        <img src="../../assets/pics/Saly-10(1).png" alt="saly">
      </div>
    </div>
    <SignUp v-if="isLogin" @toggle="toggle"/>
    <Login v-else @toggle="toggle" />
  </div>
</template>

<script>
import SignUp from "~/components/auth/SignUp";
import Login from "~/components/auth/Login";
export default {
  name: "index",
  components: { SignUp, Login },
  data() {
    return {
      isLogin: true
    };
  },
  methods: {
    signInUser(){

    },
    toggle(){
      console.log('t');
      this.isLogin = !this.isLogin;
    }
  },
};
</script>

<style scoped>
.main{
  display: flex;
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
@media only screen and (max-width: 825px) {
  /* For mobile phones: */
  .main{
    display: grid;
    /*height:100%;*/
  }
  .left-side-call {
    padding-top:10%;
  }
  .logo{
    justify-self: center;
  }
  .left-side{
    font-size: 30px;
    width:100%;
  }
  .left-side-image{
    display:none;
  }
  .logo-call{
    width:100px;
  }
}
</style>
