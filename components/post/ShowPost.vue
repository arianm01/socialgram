<template>
  <article class="post-preview">
      <div class="p-2">
        <nuxt-link :to="'/profile/'+user.ID" class="flex">
        <img
          class="h-7 w-7 mr-2 rounded-full self-center"
          src="../../static/me.jpg"
          alt="avatar"
        />
        <div class="flex flex-col">
          <h2 class="font-sm text-base">{{ user.username }}</h2>
        </div>
        </nuxt-link>
      </div>
    <img
      class="post-thumbnail"
      src="../../static/me.jpg"
      alt="thumbnail"
      @dblclick="likeOrUnlike"
    />
    <!--      :style="{backgroundImage: 'url(' + image_url + ')'}"></div>-->
    <div class="flex">
      <img src="../../assets/pics/unlike.png" class="icon" alt="like" @click="likeOrUnlike"
           v-if="!this.status">
      <img src="../../assets/pics/like.png" class="icon" @click="likeOrUnlike" v-else
           alt="like">
      <h2 style="margin: 5px 15px 0 5px"> {{ likes }} likes</h2>
    </div>
    <hr>
    <div class="post-content">
      <h1>{{ title }}</h1>
      <p>{{ previewText }}</p>
    </div>
  </article>
</template>

<script>
export default {
  name: "ShowPost",
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
      required: true
    }
  },
  data() {
    return {
      // likes: this.likes,
      // status: this.status,
      likes: 0,
      status: false,
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
        this.status = response.status;
        if (response.status === true) {
          this.likes++;
          return;
        }
        this.likes--;
      });
    },
  }
};
</script>

<style scoped>
.post-preview {
  border: 1px solid #21343b;
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

hr {
  margin-top: 5px;
  opacity: 0.5;
}

@media (min-width: 600px) {
  .post-preview {
    width: 450px;
    margin: 10px;
  }
}

.post-thumbnail {
  width: 100%;
  height: 350px;
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
