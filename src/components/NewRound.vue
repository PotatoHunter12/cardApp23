<template>
    <div class="tarok-round">
      <h1>Round Results</h1>
      <form @submit.prevent="submitRound">
        <div>
          <label for="points">Points: </label>
          <input
            id="points"
            type="number"
            v-model.number="round.points"
            @change="round25"
            :min="0"
            :max="70"
            step="5"
            required
          />
        </div>
        <div>
          <label for="game">Game:</label>
          <select id="game" v-model="round.game" required>
            <option v-for="game in games" :key="game.id" :value="game">
              {{ game.name }}
            </option>
          </select>
        </div>
        <br>
        <div>
          <label for="player">Player: </label>
          <select id="player" v-model="round.player" required>
            <option v-for="player in players" :key="player.name">
              {{ player.name }}
            </option>
          </select>
        </div>
        <div>
          <label for="partner">Partner: </label>
          <select id="partner" v-model="round.partner" required>
            <option v-for="player in players" :key="player.name">
              {{ player.name }}
            </option>
          </select>
        </div>
        <br>
        <div>
          <label>Bonuses: </label>
          <div v-for="bonus in bonusOptions" :key="bonus.id">
            <input
              type="checkbox"
              :id="'bonus-' + bonus.id"
              :value="bonus"
              v-model="round.bonuses"
            />
            <label :for="'bonus-' + bonus.id">{{ bonus.name }}</label>
          </div>
        </div>
        <br>
        <div>
          <label>Deductions: </label>
          <div v-for="deduction in deductionOptions" :key="deduction.id">
            <input
              type="checkbox"
              :id="'deduction-' + deduction.id"
              :value="deduction"
              v-model="round.deductions"
            />
            <label :for="'deduction-' + deduction.id">{{ deduction.name }}</label>
          </div>
        </div>
        <br>
        <label>Counters:</label>
        <div v-for="counter in counters" :key="counter.id">
          <input
            type="checkbox"
            :id="'counter-' + counter.id"
            :value="counter"
            v-model="selectedCounter"
            @click="handleSelection(counter)"
            :checked="checkSelection(counter)"
          />
          <label :for="'counter-' + counter.id">{{ counter.name }}</label>
          <div v-if="selectedCounter && selectedCounter.id === counter.id">
            <label for="counter-player">Select Player:</label>
            <select id="counter-player" v-model="counter.player">
              <option v-for="player in players" :key="player.name" :value="player">
                {{ player.name }}
              </option>
            </select>
          </div>
        </div>
        <br>
        <div>
          <strong>Total Points: {{ calculateTotal }}</strong>
        </div>
        <br>
        <button type="submit" class="btn2" @submit="$emit('round-submitted')">SUBMIT</button>
        <button type="button" class="btn2 back-btn" @click="{this.$emit('round-submitted');}">
          BACK
        </button>
        
      </form>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    props: {
      players: {
        type: Array,
        required: true,
      },
      id: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        players: this.players,
        games: [],
        total: 0,
        bonusOptions: [
          { id: 1, name: "Kings", points: 10 },
          { id: 2, name: "Threesome", points: 10 },
          { id: 3, name: "King Ultimo", points: 10 },
          { id: 4, name: "Pagat Ultimo", points: 25 },
          { id: 5, name: "Valat", points: 50 },
        ],
        deductionOptions: [
          { id: 1, name: "Kings", points: -10 },
          { id: 2, name: "Threesome", points: -10 },
          { id: 3, name: "King Ultimo", points: -10 },
          { id: 4, name: "Pagat Ultimo", points: -25 },
          { id: 5, name: "Valat", points: -50 },
          { id: 6, name: "Mondfang", points: -20 },
        ],
        counters: [
          { id: 1, name: "Kontra", win: -1, loss: 2},
          { id: 2, name: "Re",  win: -2, loss: 4},
          { id: 3, name: "Sub", win: -4, loss: 8},
          { id: 4, name: "Mort", win: -8, loss: 16},
        ],
        round: {
          points: 0,
          game: {points: 0, diff: false},
          player: "",
          partner: "",
          bonuses: [],
          deductions: [],
          counter: {win: 0, loss: 1},
        },
      };
    },
    computed: {
      calculateTotal() {
        const isWin = this.round.points >= 35;

        const bonusTotal = this.round.bonuses.reduce((sum, val) => sum + val.points, 0);
        const deductionTotal = this.round.deductions.reduce((sum, val) => sum + val.points, 0);
        const base = this.round.game.points * (isWin ? 1 : -1) + (this.round.game.diff ? this.round.points - 35 : 0);
        this.total = base * (!isWin ? this.round.counter.loss : 1) + bonusTotal + deductionTotal;
        return this.total;
      },
    },
    methods: {
      round25() {
        this.round.points = Math.round(this.round.points / 5) * 5;
      },
      handleSelection (item) {
      this.selected = item
      console.log(this.selected);
      
     },
     checkSelection (item) {
      return item === this.selected
     },
     async logGames() {
      const response = await axios.get('http://localhost:3000/api/rules');
      this.games = response.data;

      return this.games;
      
     },
     
      async submitRound() {
        try {
          const roundData = {
            gameId: this.id,
            player: this.round.player,
            partner: this.round.partner,
            value: this.total
          };
          await axios.post("http://localhost:3000/api/games/update", roundData);
          this.$emit('round-submitted');
          alert("Round submitted successfully!");
          this.resetForm();
        } catch (error) {
          console.error("Error submitting round:", error);
          alert("Failed to submit round.");
        }
      },
      resetForm() {
        this.round = {
          points: 0,
          game: null,
          player: "",
          partner: "",
          bonuses: [],
          deductions: [],
          counter: null,
        };
      },
      goBack() {
      this.$router.push({ name: 'gameSelect' }); // Redirect to the home page
    },
    },
    created() {
      this.logGames();
    },
  };
  </script>
  
  <style scoped>
  .tarok-round {
    max-width: 500px;
    background-color: #ff4757;
    color: white;
    margin: auto;
  }
  h1 {
    text-align: center;
  }
  .back {
    text-align: center;
    margin-bottom: 10pt;
  }

  .btn2{
    margin-bottom: 5pt;
    border-radius: 8px;
  }
  </style>
  