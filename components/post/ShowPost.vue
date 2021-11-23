<template>
  <article>
    <div
      class="post-thumbnail"
      :style="{backgroundImage: 'url(' + image_url + ')'}"></div>
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

</style>
