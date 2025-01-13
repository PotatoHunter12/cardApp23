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
        <button type="submit" class="btn2">Submit</button>
        <div class="back">
          <a @click="{this.$emit('round-submitted');}">Back</a>
        </div>
        
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
    },
    data() {
      return {
        players: this.players,
        games: [
          { id: 1, name: "Three", points: 10, diff: true },
          { id: 2, name: "Two", points: 20, diff: true },
          { id: 3, name: "One", points: 30, diff: true },
          { id: 4, name: "Solo Three", points: 40, diff: true },
          { id: 5, name: "Solo Two", points: 50, diff: true },
          { id: 6, name: "Solo One", points: 60, diff: true },
          { id: 7, name: "Beggar", points: 70, diff: false },
          { id: 8, name: "Solo no Talon", points: 80, diff: true },
          { id: 9, name: "Three - Valat of Color", points: 100, diff: false },
          { id: 10, name: "Two - Valat of Color", points: 110, diff: false },
          { id: 11, name: "One - Valat of Color", points: 120, diff: false },
          { id: 12, name: "Solo Three - Valat of Color", points: 125, diff: false },
          { id: 13, name: "Solo Two - Valat of Color", points: 150, diff: false },
          { id: 14, name: "Solo One - Valat of Color", points: 175, diff: false },
          { id: 15, name: "Solo no Talon - Valat of Color", points: 250, diff: false },
          { id: 16, name: "Three - Valat", points: 200, diff: false },
          { id: 17, name: "Two - Valat", points: 220, diff: false },
          { id: 18, name: "One - Valat", points: 240, diff: false },
          { id: 19, name: "Solo Three - Valat", points: 250, diff: false },
          { id: 20, name: "Solo Two - Valat", points: 300, diff: false },
          { id: 21, name: "Solo One - Valat", points: 350, diff: false },
          { id: 22, name: "Solo no Talon - Valat", points: 500, diff: false },
        ],
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
        return base * (!isWin ? this.round.counter.loss : 1) + bonusTotal + deductionTotal;
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
      console.log("aaa");
      return item === this.selected
     },
      async submitRound() {
        const roundData = {
          points: this.round.points,
          game: this.round.game,
          player: this.round.player,
          partner: this.round.partner,
          bonuses: this.round.bonuses,
          deductions: this.round.deductions,
          counter: this.round.counter,
          totalPoints: this.calculateTotal,
        };
        try {
          // await axios.post("/api/tarok/rounds", roundData);
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
    },
  };
  </script>
  
  <style scoped>
  .tarok-round {
    max-width: 500px;
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
  }
  </style>
  