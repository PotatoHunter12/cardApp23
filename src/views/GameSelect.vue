<!-- ScrollableGrid.vue -->
<template>
    <div>
      <h1>Games</h1>
      <div class="grid-container">
        <div class="grid">
          <div class="card" @click="openGame(element)" v-for="element in elements" :key="element._id">
            <div class="names" v-for="item in element.items" :key="item.name">
              <p>{{ item.name }}</p>
            </div>
          </div>
        </div>
      </div>
      <button class="btn" @click="navigateToAdd">Start New Game</button>
      <button class="btn" @click="back">Back</button>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    data() {
      return {
        elements: []
      };
    },
    created() {
      this.fetchElements();
    },
    methods: {
        async fetchElements() {
            try {
            const response = await axios.get('http://localhost:3000/api/elements');
            this.elements = response.data;
            } catch (error) {
            console.error("Error fetching elements:", error);
            }
        },
        navigateToAdd() {
            this.$router.push({ name: 'AddElement' });
        },
        back() {
            this.$router.push({name: 'home'});
        },
        openGame(element) {
          const items = JSON.stringify(element.items);
          this.$router.push({ name: 'gameTable', query: { items } });
        }

    }
  }
  </script>
  
  <style scoped>
  .names{
    float: left;
    padding-right: 20pt;
  }
  .grid-container {
    height: 650px;
    overflow-y: auto;
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
  </style>
  