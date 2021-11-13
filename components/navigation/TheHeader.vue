<template>
  <div class="header-container flex justify-evenly shadow-2xl ">
    <div class="self-center">
      <nuxt-link to="/"><img src="~/assets/logo/logo5.png" alt="" class="logo"></nuxt-link>
    </div>
    <div class="search-box self-center">
      <search-box />
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
import SearchBox from "~/components/features/SearchBox";
export default {
  name: "TheHeader",
  components: { SearchBox }
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
  @media only screen and (max-width: 825px) {

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
      .logo {
        width: 40px;
        height: 20px;
      }
    }
</style>
