<!-- ScrollableGrid.vue -->
<template>
  <div>
    <h1>Card App</h1>
    <button class="btn" @click="navigateToGameSel">Play</button>
    <button class="btn" @click="navigateToProfile">Profile</button>
  </div>
</template>

<script>
export default {
  methods: {
    navigateToProfile() {
      this.$router.push({name: 'profile'});
    },
    navigateToGameSel() {
      this.$router.push({name: 'gameSelect'});
    }
  }
}

</script>

<style scoped>
h1{
  font-size: 4em;
  margin: 40% auto 60%;
  text-align: center;
}
</style>
