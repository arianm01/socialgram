<template>
  <div>
  <div>
    <img src="../../assets/pics/favorite-3-128.png" class="icon" alt="follow" @click="isMenuOpen = !isMenuOpen" v-if="!isMenuOpen">
    <img src="../../assets/pics/heart-69-xxl.png" class="icon" v-on-clickaway="away" v-else>
  </div>
    <transition
      enter-active-class="transition ease-out duration-100"
      enter-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-if="isMenuOpen"
        class="absolute mt-2 w-64 rounded-md shadow-lg text-sm overflow-hidden border z-20"
      >
        <div
          class="rounded-md bg-white shadow-xs"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div v-if="reqList.length > 0" v-for="request in reqList" :key="request.ID">
            <div class="bg-gray-100 p-2 flex items-center" @click="userProfile">
              <div class="flex">
                <img
                  class="h-7 w-7 mr-2 rounded-full self-center"
                  :src="request.image_url"
                  alt="avatar"
                />
                <div class="flex flex-col">
                  <p class="font-sm text-base">{{request.username}}</p>
                  <p class="font-sm text-gray-600">{{request.name}}</p>
                </div>
                <button>Accept</button>
                <button>Reject</button>
              </div>
            </div>
          </div>
          <div v-if="reqList.length===0">
            <div class="bg-gray-100 p-2 flex items-center">
              there is nothing to show :)
            </div>
          </div>
          <div class="border-t border-gray-100"></div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { directive as onClickaway } from 'vue-clickaway';
export default {
  name: "FollowRequest",
  directives: {
    onClickaway: onClickaway,
  },
  data(){
    return {
      reqList: [],
      isMenuOpen: false
    }
  },
  methods: {
    away() {
      this.isMenuOpen = !this.isMenuOpen;
    }
  },
  watch: {
    isMenuOpen(){
      if (this.isMenuOpen){
        this.$axios.$get(process.env.baseURL + "getRequests/", {
          headers: {
            "Authorization": "Bearer " + this.$store.getters.token
          }
        }).then(response => {
          console.log(response);
          if (response.length === 0){
            return ;
          }
          this.reqList=response;
          console.log(this.reqList);
        });
      }
    }
  }
};
</script>

<style scoped>
.icon {
  height: 25px;
  width: 25px;
  margin: 5px 10px 0 20px;
}
@media only screen and (max-width: 825px) {
  .icon {
    height: 22px;
    width: 22px;
  }
}
@media only screen and (max-width: 400px) {
  .icon {
    height: 18px;
    width: 18px;
  }
}
</style>
