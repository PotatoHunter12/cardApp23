<template>
  <div class="home-container">
    <img src="/deck-of-cards.png" alt="Tarok Logo" class="deck-of-cards" />
    <h1 class="home-title">Card App</h1>
    <div class="button-group">
      <button class="btn btn-primary" @click="navigateToGameSel">Games</button>
      <button class="btn btn-secondary" @click="navigateToProfile">Profile</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    navigateToProfile() {
      this.$router.push({ name: "profile" });
    },
    navigateToGameSel() {
      this.$router.push({ name: "gameSelect" });
    },
  },
};
</script>

<style scoped>
/* Container Styling */
.home-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f9;
  font-family: Arial, sans-serif;
}

/* Title Styling */
.home-title {
  font-size: 3rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 50px;
  text-align: center;
}

/* Button Group Styling */
.button-group {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

/* Button Styling */
.btn {
  padding: 15px 30px;
  font-size: 1.2rem;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  width: 200px;
  text-align: center;
}

.btn-primary {
  background-color: #007bff;
  color: #fff;
}

.btn-primary:hover {
  background-color: #0056b3;
  transform: scale(1.05);
}

.btn-secondary {
  background-color: #6c757d;
  color: #fff;
}

.btn-secondary:hover {
  background-color: #5a6268;
  transform: scale(1.05);
}

</style>
