<template>
  <article class="post-preview">
    <div class="p-2 flex justify-between">
      <nuxt-link :to="'/profile/'+user.ID" class="flex">
        <img
          class="h-7 w-7 mr-2 rounded-full self-center"
          :src="user.image_url"
          alt="avatar"
        />
        <div class="flex flex-col">
          <h2 class="font-sm text-base">{{ user.username }}</h2>
        </div>
      </nuxt-link>
      <div>
        <div class="options" v-if="isOwner" v-on-clickaway="away" @click="isMenuOpen = !isMenuOpen">
          <img src="../../assets/pics/options.png" class="h-7 w-6" alt="">
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
            class="absolute mt-2 w-40 rounded-md shadow-lg text-sm overflow-hidden border z-20 pff"
          >
            <div
              class="rounded-md bg-white shadow-xs delete"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
              @click="deletePost"
            >Delete Post
            </div>
          </div>
        </transition>
      </div>
    </div>
    <img
      class="post-thumbnail"
      :src="image_url"
      alt="thumbnail"
      @dblclick="likeOrUnlike"
    />
    <div class="flex">
      <img src="../../assets/pics/unlike.png" class="icon" alt="like" @click="likeOrUnlike"
           v-if="!stat">
      <img src="../../assets/pics/like.png" class="icon" @click="likeOrUnlike" v-else
           alt="like">
      <h2 style="margin: 5px 15px 0 5px" v-if="ll!==1">{{ ll }} likes</h2>
      <h2 style="margin: 5px 15px 0 5px" v-else>{{ ll }} like</h2>
    </div>
    <hr>
    <div class="post-content">
      <h1>{{ title }}</h1>
      <p>{{ previewText }}</p>
    </div>
  </article>
</template>

<script>
import { directive as onClickaway } from "vue-clickaway";
import Swal from "sweetalert2";

export default {
  name: "ShowPost",
  directives: {
    onClickaway: onClickaway
  },
  props: {
    id: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    previewText: {
      type: String,
      required: true
    },
    image_url: {
      type: String,
      required: true
    },
    user: {
      required: true,
    },
    likes: {
      required: true,
    },
    status: {
      required: true,
    }
  },
  data() {
    return {
      like: [],
      stat: this.status,
      isMenuOpen: false
    };
  },
  methods: {
    likeOrUnlike() {
      this.$axios.$patch(process.env.baseURL + "post?post_id=" + this.id, {}, {
        headers: {
          "Authorization": "Bearer " + this.$store.getters.token
        }
      }).then(response => {
        console.log(response);
        this.stat = response.status;
        if (response.status === true) {
          this.like.push(this.$store.getters.user.ID);
          return;
        }
        this.like.pop();
      });
    },
    away() {
      this.isMenuOpen = false;
    },
    deletePost() {
      this.$axios.$delete(process.env.baseURL + "post?post_id=" + this.id, {
        headers: {
          "Authorization": "Bearer " + this.$store.getters.token
        }
      }).then(() =>
        Swal.fire(
          'Deleted!',
          'Your post has been deleted.',
          'success'
        )).then(() => this.$router.go())
        .catch(response => {
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
    stat() {
      return this.stat;
    }
  },
  computed: {
    ll() {
      return this.likes.length;
    },
    isOwner() {
      console.log(this.user, this.$store.getters.user);
      return this.user.ID === this.$store.getters.user.ID;
    }
  },
  created() {
    this.stat = this.status;
    this.like = this.likes;
  }
};
</script>

<style scoped>
.post-preview {
  border: 1px solid #21343b;
  border-radius: 5px;
  box-shadow: 0 2px 2px #18191b;
  background-color: #242526;
  width: 85%;
  margin-bottom: 3%;
}

article {
  text-decoration: none;
  color: white;
}

.icon {
  height: 25px;
  width: 25px;
  margin: 5px 10px 0 10px;
}

h1 {
  font-size: 18px;
}

p {
  font-size: 14px;
  opacity: 0.85;
  text-align: start;
}

.pff {
  background-color: #cccccc;
}

.delete {
  color: black;
  padding: 5px;
  cursor: pointer;
}

hr {
  margin-top: 5px;
  opacity: 0.5;
}

@media only screen and (max-width: 1200px) {
  .pff {
    right: 0;
  }
}

@media (min-width: 600px) {
  .post-preview {
    width: 450px;
    margin: 10px;
  }
}

.post-thumbnail {
  width: 100%;
  height: 300px;
  background-position: center;
  background-size: cover;
}

.post-content {
  padding: 10px;
  text-align: center;
}

a:hover .post-content,
a:active .post-content {
  background-color: #ccc;
}
</style>
