<template>
  <div class="header-container flex justify-evenly shadow-2xl ">
    <div class="self-center">
      <img src="~/assets/logo/logo5.png" alt="" class="logo">
    </div>
    <div class="search-box self-center">
      <input type="text" name="search" placeholder="Search..">
    </div>
    <div class="icons flex self-center">
      <img src="../../assets/pics/home-5-128.png" class="icon" alt="Home">
      <img src="../../assets/pics/plus-128.png" class="icon" alt="create">
      <img src="../../assets/pics/favorite-3-128.png" class="icon" alt="follow">
      <img src="../../assets/pics/icons8-google-500.png" class="icon" alt="profile">
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
    height: fit-content;
    width: 100%;
    background-color:#242526;
    padding: 1%;
  }
  .logo {
      width: 80px;
      height: 50px;
      margin-top: 0;
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
  @media only screen and (max-width: 825px) {
    input[type=text] {
      width: 100px;
      padding: 5px 10px;
      background-image: none;
    }

    .icon {
      height: 22px;
      width: 22px;
    }

    .logo {
      width: 60px;
      height: 40px;
    }
  }
    @media only screen and (max-width: 400px) {
      .icon {
        height: 18px;
        width: 18px;
      }
      input[type=text]{
        width: 70px;
      }
      .logo {
        width: 40px;
        height: 20px;
      }
    }
</style>
