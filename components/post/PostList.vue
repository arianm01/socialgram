<template>
  <section class="post-list flex flex-col">
    <show-post
      v-for="post in posts"
      :key="post.ID"
      :id="post.ID"
      :image_url="post.image_url"
      :title="post.title"
      :previewText="post.content"
      :user="post.user"
      :likes="post.likes"
      :status="post.status"
    />
  </section>
</template>

<script>
import ShowPost from "~/components/post/ShowPost";
export default {
  name: "PostList",
  components: { ShowPost },
props: {
  posts: {
      type: Array,
      required: true
  },
}
};
</script>

<style scoped>
.post-list {
  padding: 10px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>
