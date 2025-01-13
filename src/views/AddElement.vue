<template>
  <div class="add-element-container">
    <h1>Start New Game</h1>
    <form class="add-element-form" @submit.prevent="submitElement">
      <div v-for="i in this.playerNum" :key="i" class="player-input">
        <label>Player {{ i }}:</label>
        <select id="player" required>
            <option v-for="player in this.players" :key="player.username">
              {{ player.username }}
            </option>
          </select>
      </div>
      <div class="button-container">
        <button
          class="btn add-player-btn"
          type="button"
          @click="addItem"
          v-if="items.length < 4"
        >
          Add Player
        </button>
        <button class="btn save-btn" type="submit">Save</button>
      </div>
      </form>
  </div>
  <button class="btn back-btn" @click="back">Back</button>
    
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      items: [
        { name: "", value: 0 },
        { name: "", value: 0 },
        { name: "", value: 0 },
      ],
      players: [],
      playerNum: 3,
    };
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    addItem() {
      if (this.items.length < 4) {
        this.items.push({ name: "", value: 0 });
        this.playerNum = 4;
      }
    },
    async fetchUsers() {
      try {
        const response = await axios.get('http://localhost:3000/api/users/get');
        this.players = response.data;
        console.log(this.players);
        
      } catch (error) {
        this.errorMessage = error.response?.data?.message || 'Failed to fetch users.';
      }
    },
    async submitElement() {
      try {
        await axios.post("http://localhost:3000/api/elements", {
          items: this.items,
        });
        this.$router.push({ name: "home" }); // Navigate back to the grid view
      } catch (error) {
        console.error("Error saving element:", error);
      }
    },
    back() {
      this.$router.push({ name: "gameSelect" });
    },
  },
};
</script>

<style scoped>
/* Container for the entire form */
.add-element-container {
  background-color: #f4f4f9;
  height: 50vh; /* Full viewport height */
  padding: 20px;
  display: flex;
  flex-direction: column;
  font-family: 'Comic Sans MS', 'Comic Sans', cursive; /* Comic Sans font */
  text-align: center;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  color: #333;
}

/* Form layout */
.add-element-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  color: #333;
}

/* Styling for player input fields */
.player-input {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  max-width: 400px;
}

.player-input label {
  margin-bottom: 8px;
  font-weight: bold;
}

.player-input input {
  padding: 10px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  width: 100%;
}

/* Button container for alignment */
.button-container {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px; /* Add spacing before the Back button */
}

/* Button styles */
.btn {
  padding: 10px 15px;
  border: none;
  background-color: #ff4757;
  color: white;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  text-transform: uppercase;
  font-family: 'Comic Sans MS', 'Comic Sans', cursive;
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
.add-player-btn {
  background-color: #ff4757;
}

.add-player-btn:hover {
  background-color: #e33d4f;
}

.save-btn {
  background-color: #ff4757;
}

.save-btn:hover {
  background-color: #e33d4f;
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
