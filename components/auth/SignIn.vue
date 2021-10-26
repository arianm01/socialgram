<template>
  <div class="banner w-2/3">
    <div class="right-side h-screen">
      <h1 align="center">Right Side</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "SignIn"
};
</script>

<style scoped>
.right-side {
  background-color: #21343b;
  border-radius: 50px 0 0 50px;
  z-index: 1;
}
.banner {
  background-color:#b0d8da;
  z-index: 10;
  color: #fff;
}
</style>
