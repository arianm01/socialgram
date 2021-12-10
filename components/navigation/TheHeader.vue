<template>
  <div class="header-container flex justify-evenly shadow-2xl ">
    <div class="self-center">
      <img src="~/assets/logo/logo5.png" alt="" class="logo">
    </div>
    <div class="place-self-center">
      <search-box />
    </div>
    <div class="icons flex self-center ">
      <nuxt-link to="/"><img src="../../assets/pics/home-5-128.png" class="icon " alt="Home"></nuxt-link>
      <nuxt-link to="/post"><img src="../../assets/pics/plus-128.png" class="icon" alt="create"></nuxt-link>
      <div><follow-request /></div>
      <div>
      <img :src="image" class="avatar rounded-full" alt="profile" @click="isProfileOpen=!isProfileOpen">
      <transition
        enter-active-class="transition ease-out duration-100"
        enter-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95"
      >
        <div
          v-on-clickaway="away"
          v-if="isProfileOpen"
          class="absolute mt-2 w-56 rounded-md shadow-lg text-sm overflow-hidden border z-20 pff"
        >
          <div
            class="rounded-md bg-white shadow-xs"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <div>
              <nuxt-link :to="profile" >
              <div class="bg-gray-100 p-2 flex items-center" @click="away">
                <div class="flex">
                  <img
                    class="h-7 w-7 mr-2 rounded-full self-center"
                    :src="image"
                    alt="avatar"
                  />
                  <div class="flex flex-col">
                    <p class="font-sm text-base">{{this.$store.getters.user.username}}</p>
                    <p class="font-sm text-gray-600">{{this.$store.getters.user.name}}</p>
                  </div>
                </div>
              </div>
              </nuxt-link>
            </div>
            <div class="border-t border-gray-100"></div>
            <div class="py-1 logout" @click="logout">
                <span class="p-4 flex items-center space-x-2 "> Logout </span>
            </div>
          </div>
        </div>
      </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { directive as onClickaway } from 'vue-clickaway';
import SearchBox from "~/components/features/SearchBox";
import FollowRequest from "~/components/features/FollowRequest";
export default {
  name: "TheHeader",
  components: { FollowRequest, SearchBox },
  data () {
    return {
      isProfileOpen: false,
    }
  },
  directives: {
    onClickaway: onClickaway,
  },
  methods: {
    away() {
      this.isProfileOpen = !this.isProfileOpen;
    },
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/auth");
    },
  },
  computed: {
    image(){
      if (!!this.$store.getters.user)
      return this.$store.getters.user.image_url;
    },
    profile(){
      return "profile/"+this.$store.getters.user.ID;
    }
  },
  created() {

  }
};
</script>

<style scoped>
  .header-container {
    height: fit-content;
    width: 100%;
    background-color:#242526;
    padding: 1%;
  }
  .logout{
    cursor: pointer;
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
    height: 40px;
    width: 40px;
    padding: 8px;
  }
  .avatar{
    height:45px;
    width: 45px;
    padding: 8px;
  }
  @media only screen and (max-width:1200px) {
    .pff{
      right: 0;
    }
  }
  @media only screen and (max-width: 825px) {
    .logo {
      width: 60px;
      height: 40px;
    }
  }
    @media only screen and (max-width: 400px) {
      .logo {
        width: 40px;
        height: 20px;
      }
    }
</style>
