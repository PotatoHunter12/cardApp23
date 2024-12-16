<!-- AddElement.vue -->
<template>
    <div>
      <h1>Start New Game</h1>
      <form @submit.prevent="submitElement">
        <div v-for="(item, index) in items" :key="index">
          <label>Player {{ index + 1 }}:</label>
          <input v-model="item.name" type="text" placeholder="Enter name" required />
        </div>
        <button type="button" @click="addItem" v-if="items.length < 4">Add Player</button>
        <button type="submit">Save</button>
        <button class="btn" @click="back">Cancel</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    data() {
      return {
        items: [
          { name: '', value: 0 },
          { name: '', value: 0 },
          { name: '', value: 0 }
        ]
      };
    },
    methods: {
      addItem() {
        if (this.items.length < 4) {
          this.items.push({ name: '', value: 0 });
        }
      },
      async submitElement() {
        try {
          await axios.post('http://localhost:3000/api/elements', { items: this.items });
          this.$router.push({ name: 'home' });  // Navigate back to the grid view
        } catch (error) {
          console.error('Error saving element:', error);
        }
      },
      back() {
            this.$router.push({name: 'home'});
      }
    }
  }
  </script>
  