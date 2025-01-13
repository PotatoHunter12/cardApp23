<script>
import NewRound from './NewRound.vue';

export default {
  data() {
    return {
      showNewRound: false,
      items: [], // Initialize players/items
      rounds: [], // Tracks rounds with points
    };
  },
  created() {
    const items = this.$route.query.items;
    if (items) {
      this.items = JSON.parse(items); // Parse the JSON string
      console.log(this.items);
    }
  },
  methods: {
    toggleNewRound() {
      this.showNewRound = !this.showNewRound;
    },
    addRound(newRound) {
      this.rounds.push(newRound); // Add new round points
      this.showNewRound = false; // Hide the new round form
    },
    goBack() {
      this.$router.push({ name: 'gameSelect' }); // Redirect to the home page
    },
  },
  components: {
    NewRound,
  },
};
</script>




<template>
  <main class="game-view">
    <!-- Header with Add Round Button and Title -->
    <div class="header">
      <h1 class="game-title">My Game</h1>
      <button class="btn add-round-btn" @click="toggleNewRound">Add Round</button>
    </div>

    <!-- Points Table -->
    <table class="points-table">
      <thead>
        <tr>
          <th>Players</th>
          <th v-for="item in items" :key="item.name">
            {{ item.name }}
          </th>
        </tr>
      </thead>
      <tbody>
        <!-- Radli Row -->
        <tr>
          <td>Radli</td>
          <td v-for="item in items" :key="item.name">
            xoo
          </td>
        </tr>

        <!-- Rounds -->
        <tr v-for="(round, index) in rounds" :key="index">
          <td>{{ index + 1 }}</td>
          <td></td>
          <td v-for="points in round" :key="points">
            {{ points || '-' }}
          </td>
        </tr>

        <!-- Totals -->
        <tr class="totals-row">
          <td>Totals</td>
          <td v-for="item in items" :key="item.name">
            {{ rounds.reduce((sum, round) => sum + (round[items.indexOf(item)] || 0), 0) }}
          </td>
        </tr>
      </tbody>
    </table>

    <!-- New Round Modal -->
    <NewRound
      v-if="showNewRound"
      @round-submitted="addRound"
      :players="items"
      class="nrnd"
    ></NewRound>

    <!-- Back Button -->
    <button class="btn back-btn" @click="goBack">BACK</button>
  </main>
</template>





<style>
/* Main Container */
.game-view {
  background-color: #f4f4f9;
  padding: 20px;
  font-family: 'Comic Sans MS', 'Comic Sans', cursive;
  text-align: center;
  position: relative;
  min-height: 100vh;
}

/* Header */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.game-title {
  font-size: 28px;
  font-weight: bold;
  color: #333;
}

/* Add Round Button */
.add-round-btn {
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

.add-round-btn:hover {
  background-color: #e33d4f;
  transform: scale(1.05);
}

.add-round-btn:active {
  transform: scale(0.95);
}

/* Points Table */
.points-table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px auto;
  text-align: center;
}

.points-table th,
.points-table td {
  border: 2px solid #ddd;
  padding: 10px;
  font-size: 16px;
}

.points-table th {
  background-color: #ff4757;
  color: white;
  font-weight: bold;
}

.points-table tr:nth-child(even) {
  background-color: #ffe6e6;
}

.totals-row {
  font-weight: bold;
  background-color: #e33d4f;
  color: #333;
}

/* New Round Modal */
.nrnd {
  background-color: rgb(250, 106, 106);
  padding: 10pt 20pt;
  color: white;
  position: absolute;
  top: 20pt;
  left: 12%;
  right: 12%;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* Back Button */
.back-btn {
  position: center;
  bottom: 20px;
  background-color: #5a5a5a;
  color: white;
  padding: 10px 15px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  font-family: 'Comic Sans MS', 'Comic Sans', cursive;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.back-btn:hover {
  background-color: #424242;
  transform: scale(1.05);
}

</style>