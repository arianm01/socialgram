<template>
  <div class="banner h-screen w-2/3">
    <form @submit.prevent="$emit('submit')">
      <div class="right-side h-screen flex flex-col">
        <div class="flex flex-row justify-end english1 .flex-1"><h1 class="english">English(</h1><img
          src="../../assets/pics/contents.png" alt="english" width="30" />)
        </div>
        <h1 class="title justify-self-center">Login to your Account</h1>
        <div class="flex flex-row justify-between btns">
          <div class="css-button-sliding-to-left--blue">
            <div class="flex flex-row">
              <img src="../../assets/pics/icons8-google-50.png" class="w-10 g-span" alt="google" />
              <p class="Goo-p">continue with Google</p>
            </div>
          </div>
          <div class="css-button-sliding-to-left--blue">
            <div class="flex flex-row">
              <img src="../../assets/pics/icons8-facebook-50.png" class="w-10 g-span" alt="facebook" />
              <p class="Goo-p">continue with facebook</p>
            </div>
          </div>
        </div>
        <h1 style="align-self: center; font-size: 25px;" class="m-5">-OR-</h1>
        <div class="flex flex-row justify-center mt-7">
          <input type="text" placeholder="Username or email" style="width:50%;" class="input_box">
        </div>
        <div class="flex flex-row justify-center mt-7">
          <input type="password" placeholder="Password" style="width:50%;" class="input_box">
        </div>
        <button class="css-button-sliding-to-left--green place-self-center" type="submit">
          Login
        </button>
        <div class="mt-7 log">
          don't have an account ? <span class="login" style="display:block;">Sign up</span>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "Login"
};
</script>

<style scoped>
.right-side {
  background-color: #21343b;
  border-radius: 50px 0 0 50px;
  padding: 2%;
  z-index: 1;
}

.btns {
  justify-content: space-around;
  margin-top: 3%;
}

.title {
  align-self: center;
  font-size: 35px;
}

.css-button-sliding-to-left--blue {
  min-width: 130px;
  height: 55px;
  color: #fff;
  padding: 5px 10px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  outline: none;
  border-radius: 5px;
  z-index: 0;
  font-size: 25px;
  background: #21343b;
  overflow: hidden;
  border: 2px solid #fff;
}

.css-button-sliding-to-left--blue:hover {
  color: #21343b;
}

.css-button-sliding-to-left--blue:hover:after {
  width: 100%;
}

.css-button-sliding-to-left--blue:after {
  content: "";
  position: absolute;
  z-index: -1;
  transition: all 0.3s ease;
  left: 0;
  top: 0;
  width: 0;
  height: 100%;
  background: #fff;
}


.css-button-sliding-to-left--green {
  align-self: center;
  justify-self: center;
  min-width: 130px;
  width: 70%;
  height: 50px;
  color: #21343b;
  padding: 5px 10px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  outline: none;
  border-radius: 5px;
  z-index: 0;
  margin-top: 30px;
  font-size: 25px;
  background: #b0d8da;
  overflow: hidden;
  text-align: center;
  border: 2px solid #b0d8da;
}

.css-button-sliding-to-left--green:hover {
  color: #b0d8da;
}

.css-button-sliding-to-left--green:hover:after {
  width: 100%;
}

.css-button-sliding-to-left--green:after {
  content: "";
  position: absolute;
  z-index: -1;
  transition: all 0.3s ease;
  left: 0;
  top: 0;
  width: 0;
  height: 100%;
  background: #21343b;
}


.banner {
  background-color: #b0d8da;
  z-index: 10;
  color: #fff;
}

.input_box {
  background: #21343b;
  border-style: none;
  border-bottom: 1px solid white;
  width: 35%;
  color: #fff;
  font-size: 20px;
}
.login{
  color: blue;
  cursor: pointer;
}
.log{
  width:70%;
  align-self: center;
  font-size: 20px;
}

@media only screen and (max-width: 980px) {
  /* For mobile phones: */
  .css-button-sliding-to-left--blue {
    font-size: 20px;
    min-width: 105px;
    height: 45px;
  }
  .g-span {
    width: 13%;
  }
}


@media only screen and (max-width: 825px) {
  /* For mobile phones: */
  .css-button-sliding-to-left--blue {
    font-size: 18px;
    height: 50px;
    border:none;
    min-width: fit-content;
  }
  .css-button-sliding-to-left--blue:after {
   background-color: #21343b;
  }
  .btns{
    justify-content:space-evenly;
  }
  .english1{
    display: none;
  }
  .Goo-p{
    display:none;
  }
  .title{
    font-size: 30px;
  }
  .right-side{
    width: 100%;
    /*height: fit-content;*/
    min-height: 100%;
    border-radius: 50px 50px 0 0;
  }
  .banner{
    width: 100%;
    /*min-height: min-content;*/
  }
  .g-span {
    width: 85%;
  }
}
</style>
