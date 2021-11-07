<template>
  <div>
    <h1>Dash</h1>

  </div>
</template>

<script>
export default {
  methods: {
  },
  middleware: ["check-auth", "auth"],
}
</script>
