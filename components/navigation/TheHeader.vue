<template>
  <div class="header-container flex justify-evenly shadow-2xl ">
    <div class="logo">
      <img src="~/assets/logo/logo5.png" alt="" width="90%">
    </div>
    <div class="search-box">
      <input type="text" name="search" placeholder="Search..">
    </div>
    <div class="icons flex">
      <img src="../../assets/pics/home-5-128.png" class="icon">
      <img src="../../assets/pics/plus-128.png" class="icon">
      <img src="../../assets/pics/favorite-3-128.png" class="icon">
      <img src="../../assets/pics/icons8-google-500.png" class="icon">
    </div>
  </div>
</template>

<script>
export default {
  name: "TheHeader"
};
</script>

<style scoped>
  .header-container {
    height: 8%;
    background-color:#242526;
    padding: 1%;
  }
  .logo {

  }
  .icons{
    justify-content: space-evenly;
  }
  .icon {
    height: 25px;
    width: 25px;
    margin-top: 5px;
    margin-left: 20px;
    margin-bottom: 0;
  }
  input[type=text] {
    width: 250px;
    box-sizing: border-box;
    border: 2px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    background-color: white;
    background-image: url('../../assets/pics/img.png');
    background-position: 75px 5px;
    background-repeat: no-repeat;
    padding: 5px 20px 5px 100px;
  }
  input[type=text]:focus {
    outline: none;
    padding: 5px 20px 5px 20px;
    background-image: none;
  }
</style>
