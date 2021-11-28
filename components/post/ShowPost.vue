<template>
  <article class="post-preview">
    <div class="flex p-2">
      <img
        class="h-7 w-7 mr-2 rounded-full self-center"
        src="../../static/me.jpg"
        alt="avatar"
      />
      <div class="flex flex-col">
        <p class="font-sm text-base">Fayaz Ahmed</p>
      </div>
    </div>
    <img
      class="post-thumbnail"
      src="../../static/me.jpg"
      alt="thumbnail"/>
<!--      :style="{backgroundImage: 'url(' + image_url + ')'}"></div>-->
    <div class="flex">
      <img src="../../assets/pics/favorite-3-128.png" class="icon" alt="follow" @click="isMenuOpen = !isMenuOpen"
           v-if="!isMenuOpen">
      <img src="../../assets/pics/heart-69-xxl.png" class="icon" @click="isMenuOpen = !isMenuOpen" v-else
           alt="follow">
      <p style="margin: 5px 15px 0 5px"> 2 likes</p>
    </div>
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
    }
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
p{
  font-size: 14px;
}

@media (min-width: 850px) {
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
