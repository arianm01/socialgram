<template>
  <div class="banner w-2/3">
    <div class="right-side h-screen flex flex-col">
      <div class="flex flex-row justify-end english1 .flex-1"><h1 class="english">English(</h1><img
        src="../../assets/pics/contents.png" alt="english" width="30" />)
      </div>
      <h1 class="title justify-self-center">Create Account</h1>
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
      <div class="flex flex-row justify-start">
        <h1 class="txt-avatar">Add Your Avatar</h1>
        <input type="file" class="avatar">
      </div>
      <div class="flex flex-row justify-between mt-7">
        <input type="text" placeholder="Name" required class="input_box ml-7">
        <input type="text" placeholder="Username" style="width:39%;" class="input_box mr-10">
      </div>
      <div class="flex flex-row justify-between mt-7">
        <input type="email" placeholder="Email" class="input_box ml-7">
        <div class="flex flex-row justify-around">
          <input type="text" placeholder="Gender" class="input_box">
          <input type="number" placeholder="Age" class="input_box mr-2">
        </div>
      </div>
      <div class="flex flex-row justify-between mt-7">
        <input type="password" placeholder="Password" class="input_box ml-7">
        <div class="flex flex-row justify-around">
          <input type="text" placeholder="Country" class="input_box">
          <input type="text" placeholder="City" class="input_box mr-2">
        </div>
      </div>
      <div class="css-button-sliding-to-left--green ">
        Create Account
      </div>
      <div class="mt-7 log">
        Already have an account ? <span class="login">Login</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SignIn",
  layout: "default"
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

.txt-avatar {
  font-size: 20px;
  align-self: center;
  margin: 6px 3% 3%;
}

.avatar {
  cursor: pointer;
  border-radius: 5px;
  border: 2px solid #fff;
  padding: 5px 10px;
  height: 45px;
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
  .txt-avatar {
    font-size: 18px;
  }
}


@media only screen and (max-width: 825px) {
  /* For mobile phones: */
  .css-button-sliding-to-left--blue {
    font-size: 18px;
    height: 50px;
    border:none;
    margin-left: 8%;
    width: fit-content;
  }
  .btns{
    justify-content: center;

  }
  .english1{
    display: none;
  }
  .Goo-p{
    display:none;
  }
  .right-side{
    width: 100%;
    height: min-content;
    border-radius: 50px 50px 0 0;
  }
.banner{
  width: 100%;
}
  .g-span {
    width: 50%;
  }

  .txt-avatar {
    font-size: 16px;
  }
}

@media only screen and (max-width: 480px) {
  /* For mobile phones: */
  .txt-avatar {
    font-size: 15px;
  }
}

</style>
