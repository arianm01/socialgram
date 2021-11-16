<template>
  <div class="body-div h-screen">
      <post-list :posts="posts"/>
      <infinite-loading v-if="isTherePost" @infinite="infiniteHandler"></infinite-loading>
      <p class="text-center" v-else>that was all of your posts</p>
  </div>
</template>

<script>
import PostList from "~/components/post/PostList";
import InfiniteLoading from 'vue-infinite-loading';
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
      isTherePost: true
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
    });
  },
}
</script>

<style scoped>
.body-div {
  background-color: #18191b;
  color:#f5f5f5;
}
</style>
