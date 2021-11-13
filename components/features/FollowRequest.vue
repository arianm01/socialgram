<template>
  <div>
  <div>
    <img src="../../assets/pics/favorite-3-128.png" class="icon" alt="follow" @click="isMenuOpen = !isMenuOpen" v-if="!isMenuOpen">
    <img src="../../assets/pics/heart-69-xxl.png" class="icon" v-on-clickaway="away" @click="isMenuOpen = !isMenuOpen" v-else>
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
          <div>
            <div class="p-2 flex items-center">
              <div class="flex">
                <img
                  class="h-7 w-7 mr-2 rounded-full self-center"
                  src="https://fayazz.co/fayaz.jpg"
                  alt="avatar"
                />
                <div class="flex flex-col">
                <p class="font-sm text-base">Fayaz Ahmed</p>
                  <p class="font-sm text-gray-600">fayaz@email.com</p>
                </div>
                <button>Accept</button>
                <button>Reject</button>
              </div>
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
      isMenuOpen: false
    }
  },
  methods: {
    away() {
      this.isMenuOpen = !this.isMenuOpen;
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
