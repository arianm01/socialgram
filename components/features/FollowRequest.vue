<template>
  <div>
    <div>
      <img src="../../assets/pics/favorite-3-128.png" class="icon" alt="follow" @click="isMenuOpen = !isMenuOpen"
           v-if="!isMenuOpen">
      <img src="../../assets/pics/heart-69-xxl.png" class="icon" @click="isMenuOpen = !isMenuOpen" v-else
           v-on-clickaway="away" alt="follow">
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
        class="absolute mt-2 w-64 rounded-md shadow-lg text-sm overflow-hidden border z-20 pff"
      >
        <div
          class="rounded-md bg-white shadow-xs"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div v-if="reqList.length > 0" v-for="request in reqList" :key="request.ID">
            <div class="bg-gray-100 kk p-2 flex items flex-col">
              <nuxt-link :to="'/profile/'+request.ID" class="flex">
                <img
                  class="h-8 w-8 mr-2 rounded-full self-center"
                  :src="request.image_url"
                  alt="avatar"
                />
                <div class="flex flex-col self-start">
                  <p class="font-sm text-base">{{ request.username }}</p>
                  <p class="font-sm text-gray-600">{{ request.name }}</p>
                </div>
              </nuxt-link>
            </div>
            <div class="flex bg-gray-100 btns">
              <button class="btn accept place-self-end" @click="status(request.ID,'ACCEPT')">Accept</button>
              <button class="ml-1 btn reject" @click="status(request.ID,'DECLINE')">Reject</button>
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
import {directive as onClickaway} from "vue-clickaway";
import Swal from "sweetalert2";

export default {
  name: "FollowRequest",
  directives: {
    onClickaway: onClickaway
  },
  data() {
    return {
      reqList: [],
      isMenuOpen: false
    };
  },
  methods: {
    away() {
      this.isMenuOpen = false;
    },
    status(ID, status) {
      console.log(this.reqList)
      this.$axios.$put(process.env.baseURL + "request?user_id=" + ID + "&status=" + status, {}, {
        headers: {
          "Authorization": "Bearer " + this.$store.getters.token
        }
      }).then(response => {
        this.reqList=[];
        console.log(response, status);
      }).catch(response => {
        this.reqList=[];
        if (response.response)
          Swal.fire(
            {
              title: 'sth went wrong :(',
              text: response.response.data.description,
              icon: 'error',
              confirmButtonText: 'OK'
            });
      });
    }
  },
  watch: {
    isMenuOpen() {
      if (this.isMenuOpen) {
        this.$axios.$get(process.env.baseURL + "request", {
          headers: {
            "Authorization": "Bearer " + this.$store.getters.token
          }
        }).then(response => {
          console.log(response);
          if (response.length === 0) {
            return;
          }
          this.reqList = response;
          console.log(this.reqList);
        });
      }
    }
  }
};
</script>

<style scoped>
.icon {
  height: 40px;
  width: 40px;
  padding: 8px;
}

.accept {
  color: white;
  padding: 5px;
  background-color: forestgreen;
}

.reject {
  color: white;
  padding: 5px;
  background-color: crimson;
}

.items {
  width: fit-content;
}

.pff {
  background-color: #cccccc;
}

.kk {
  width: inherit;
}

.btns {
  width: inherit;
  justify-content: end;
}

@media only screen and (max-width: 1200px) {
  .pff {
    right: 0;
  }
}
</style>
