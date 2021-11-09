<template>
  <div class="body-div h-screen">
    <h1>Dash</h1>

  </div>
</template>

<script>
export default {
  layout: 'app',
  methods: {
  },
  middleware: 'auth',
}
</script>

<style scoped>
.body-div {
  background-color: #18191b;
  color:#f5f5f5;
}
</style>
