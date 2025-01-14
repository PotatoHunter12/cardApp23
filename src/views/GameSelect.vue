<template>
  <div class="games-container">
    <h1 class="games-title">Games</h1>
    <div class="grid-container">
      <div class="grid">
        <div class="card" @click="openGame(game)" v-for="game in games" :key="game._id">
          <div class="names" v-for="player in game.players" :key="player.name">
            <p>{{ player.name }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="button-container">
      <button class="btn start-game-btn" @click="navigateToAdd">Start New Game</button>
      <button class="btn count-points-btn" @click="navigateToRules">How to Count Points</button>
    </div>
    
  </div>
  <button class="btn back-btn" @click="back">Back</button>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      games: [],
    };
  },
  created() {
    this.fetchElements();
  },
  methods: {
    async fetchElements() {
      try {
        const response = await axios.get("http://localhost:3000/api/games/get");
        this.games = response.data;
        
        
      } catch (error) {
        console.error("Error fetching elements:", error);
      }
    },
    navigateToAdd() {
      this.$router.push({ name: "AddGame" });
    },
    navigateToRules() {
      this.$router.push({ name: "PointRules" });
    },
    back() {
      this.$router.push({ name: "home" });
    },
    openGame(game) {
      const id = game._id;
      this.$router.push({ name: "gameTable", query: { gameId: id } });
    },
  },
};
</script>

<style scoped>
/* Set the background color */
.games-container {
  background-color: #f4f4f9;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  height: 70vh; /* Full viewport height */
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Centered title styling */
.games-title {
  color: #333;
  font-size: 36px;
  font-family: 'Comic Sans MS', 'Comic Sans', cursive;
  text-align: center;
  margin-bottom: 20px;
}

/* Grid styling */
.grid-container {
  height: 500px;
  overflow-y: auto;
  width: 100%;
  max-width: 800px;
}
.grid-container::-webkit-scrollbar {
  display: none;
}
.grid {
  display: grid;
  gap: 10px;
}
.card {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  background-color: #f9f9f9;
  justify-content: space-evenly;
}
.names {
  float: left;
  padding-right: 20px;
}

/* Buttons container for alignment */
.button-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
}

/* General button styling */
.btn {
  display: inline-block;
  padding: 10px 15px;
  border: none;
  background-color: #ff4757;
  color: white;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  font-family: 'Comic Sans MS', 'Comic Sans', cursive;
  text-transform: uppercase;
  transition: background-color 0.3s, transform 0.2s;
}

.btn:hover {
  background-color: #e33d4f;
  transform: scale(1.05);
}

.btn:active {
  transform: scale(0.95);
}

/* Specific button styling */
.start-game-btn {
  margin-right: 20px;
}

.count-points-btn {
  margin-left: auto;
}

.back-btn {
  background-color: #5a5a5a;
  display: block;
  margin: 30px auto 0 auto;
  width: fit-content;
}
.back-btn:hover {
  background-color: #424242;
  transform: scale(1.05);
}
</style>
