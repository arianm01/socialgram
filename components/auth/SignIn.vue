<template>
  <div class="banner w-2/3">
    <div class="right-side h-screen flex flex-col">
      <div class="flex flex-row justify-end .flex-1"><h1 class="english">English(</h1><img
        src="../../assets/pics/contents.png" alt="english" width="30"/>)
      </div>
      <h1 class="title justify-self-center">Create Account</h1>
      <div class="flex flex-row justify-between btns">
        <div class="css-button-sliding-to-left--blue">
          <div class="flex flex-row">
            <img src="../../assets/pics/icons8-google-50.png" class="w-10 g-span" alt="google"/>
            <p class="">continue with Google</p>
          </div>
        </div>
        <div class="css-button-sliding-to-left--blue">
          <div class="flex flex-row">
            <img src="../../assets/pics/icons8-facebook-50.png" class="w-10 g-span" alt="facebook" />
            <p>continue with facebook</p>
          </div>
        </div>
      </div>
      <h1 style="align-self: center; font-size: 25px;" class="m-5">-OR-</h1>
      <div class="flex flex-row justify-start">
        <span class="underline">Add Avatar</span>
        <hr class="underline">
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

.title {
  align-self: center;
  font-size: 35px;
}

.underline{
  margin-top: 1%;
  width: max-content;
}

.css-button-sliding-to-left--blue {
  min-width: 130px;
  height: 60px;
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

.banner {
  background-color: #b0d8da;
  z-index: 10;
  color: #fff;
}

@media only screen and (max-width: 980px) {
  /* For mobile phones: */
  .css-button-sliding-to-left--blue{
    font-size:22px;
  }
  .g-span{
    width: 13%;
  }
}


@media only screen and (max-width: 888px) {
  /* For mobile phones: */
  .css-button-sliding-to-left--blue{
    font-size:19px;
  }
  .g-span{
    width: 12%;
  }
}

</style>
