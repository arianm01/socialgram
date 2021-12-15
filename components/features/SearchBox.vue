<template>
  <div id="autocomplete" class="autocomplete">
    <input v-on-clickaway="away" type="text" name="search" aria-label="Search" v-model="search" placeholder="Search..">
    <transition
      enter-active-class="transition ease-out duration-100"
      enter-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-if="showSearch"
        class="absolute mt-2 w-64 rounded-md shadow-lg text-sm overflow-hidden border z-20 pff"
      >
        <div
          class="rounded-md bg-white shadow-xs"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div v-if="searchResult.length > 0" v-for="searchRes in searchResult" :key="searchRes.ID">
            <nuxt-link :to="'/profile/'+searchRes.ID">
              <div class="bg-gray-100 p-2 flex items-center">
                <div class="flex">
                  <img
                    class="h-7 w-7 mr-2 rounded-full self-center"
                    :src="searchRes.image_url"
                    alt="avatar"
                  />
                  <div class="flex flex-col">
                    <p class="font-sm text-base">{{ searchRes.username }}</p>
                    <p class="font-sm text-gray-600">{{ searchRes.name }}</p>
                  </div>
                </div>
              </div>
            </nuxt-link>
          </div>
          <div v-if="searchResult.length===0">
            <div class="bg-gray-100 p-2 flex items-center">
              there is nothing to show :)
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>

</template>

<script>
import { directive as onClickaway } from "vue-clickaway";

export default {
  name: "SearchBox",
  directives: {
    onClickaway: onClickaway
  },
  data() {
    return {
      search: "",
      showSearch: false,
      searchResult: []
    };
  },
  methods: {
    searcher() {
  //    if (this.search.length < 3)
 //       return;
      this.$axios.$get(process.env.baseURL + "search/" + this.search + "?page=0", {
        headers: {
          "Authorization": "Bearer " + this.$store.getters.token
        }
      }).then(response => {
        console.log(response);
        if (response.length === 0) {
          return;
        }
        this.searchResult = response;
        console.log(this.searchResult);
      });
    },
    away() {
      this.showSearch = false;
    }
  },
  watch: {
    search() {
      this.showSearch = false;
      this.searchResult = [];
      if (this.search.length > 0) {
        this.showSearch = true;
   //     if (this.search.length > 2) {
          this.searcher();
     //   }
      }
    }
  }
};
</script>

<style scoped>
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

#autocomplete {
  max-width: 400px;
  margin: 0 auto;
}

.group {
  padding: 16px;
  text-transform: uppercase;
  font-size: 14px;
  background: rgba(0, 0, 0, 0.06);
}

.username {
  font-size: 20px;
  margin-bottom: 8px;
}

.name {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.54);
}

@media only screen and (max-width: 825px) {
  input[type=text] {
    font-size: 14px;
    width: 100px;
    padding: 5px 10px;
    background-image: none;
  }

  input[type=text]:focus {
    padding: 5px 0;
  }
}

@media only screen and (max-width: 400px) {
  input[type=text] {
    width: 60px;
    font-size: 12px;
  }

  @media only screen and (max-width: 300px) {
    .pff {
      right: 0;
    }
  }
}
</style>
