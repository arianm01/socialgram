<template>
  <div class="body-div">
    <div>
      <post-list :posts="posts"/>
      <infinite-loading v-if="isTherePost" @infinite="infiniteHandler"
                        :class="{'h-screen': posts.length<2}"></infinite-loading>
      <p class="text-center" :class="{'h-screen': posts.length<2}" v-else>that was all of your posts</p>
    </div>
  </div>
</template>

<script>
import PostList from "~/components/post/PostList";
import InfiniteLoading from 'vue-infinite-loading';
import Swal from "sweetalert2";
import BaseSpinner from "~/components/features/BaseSpinner";

export default {
  components: {InfiniteLoading, PostList,BaseSpinner},
  layout: 'app',
  methods: {
    async infiniteHandler($state) {
      const result = await this.$axios.$get(process.env.baseURL + "dashboard?page=" + this.page, {
        headers: {
          "Authorization": "Bearer " + this.$store.getters.token
        }
      });
      console.log(result);
      if (result.length === 0) {
        this.isTherePost = false;
        $state.complete();
        return;
      }
      for (const key in result) {
        console.log(result[key]);
        this.posts.push({...result[key], status: false});
        for (const user in result[key].likes) {
          console.log(user);
          if (result[key].likes[user].ID === this.$store.getters.user.ID) {
            this.posts[this.posts.length - 1].status = true;
            break;
          }
        }
      }
      this.page += 1;
      $state.loaded();
      console.log(this.posts);
      if (result.response) {
        Swal.fire(
          {
            title: 'sth went wrong :(',
            text: result.response.data.description,
            icon: 'error',
            confirmButtonText: 'OK'
          });
        if (result.response.data.title === "Unauthorized") {
          this.$store.dispatch('autoLogout');
        }
      }
    }
  },
  middleware: 'auth',
  data() {
    return {
      page: 0,
      posts: [],
      isTherePost: true,
    }
  },
}
</script>

<style scoped>
.body-div {
  background-color: #18191b;
  color: #f5f5f5;
  height: inherit;
}
</style>
