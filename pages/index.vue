<template>
  <div class="body-div">
      <post-list :posts="posts"/>
      <infinite-loading v-if="isTherePost" @infinite="infiniteHandler" :class="{'h-screen': posts.length===0}"></infinite-loading>
      <p class="text-center" :class="{'h-screen': posts.length===0}" v-else>that was all of your posts</p>
  </div>
</template>

<script>
import PostList from "~/components/post/PostList";
import InfiniteLoading from 'vue-infinite-loading';
import Swal from "sweetalert2";
export default {
  components: { InfiniteLoading, PostList },
  layout: 'app',
  methods: {
    infiniteHandler(){
      this.$axios.$get(process.env.baseURL + "dashboard?page="+this.page, {
        headers: {
          "Authorization": "Bearer " + this.$store.getters.token
        }
      }).then(response => {
        console.log(response);
        if (response.length === 0) {
          this.isTherePost=false;
          return;
        }
        this.page += 1;
        this.posts.push(response);
        console.log(this.posts);
      });
    }
  },
  middleware: 'auth',
  data () {
    return {
      page: 1,
      posts : [],
      isTherePost: true,
    }
  },
  created () {
    this.$axios.$get(process.env.baseURL + "dashboard?page=0", {
      headers: {
        "Authorization": "Bearer " + this.$store.getters.token
      }
    }).then(response => {
      console.log(response);
      if (response.length === 0) {
        this.isTherePost = false;
        return;
      }
      this.posts = response;
      console.log(this.posts);
    }).catch(response => {
      if (response.response) {
        Swal.fire(
          {
            title: 'sth went wrong :(',
            text: response.response.data.description,
            icon: 'error',
            confirmButtonText: 'OK'
          });
        if(response.response.data.title === "Unauthorized"){
            this.$store.dispatch('autoLogout');
        }
      }
    });
  },
}
</script>

<style scoped>
.body-div {
  background-color: #18191b;
  color:#f5f5f5;
  height: inherit;
}
</style>
