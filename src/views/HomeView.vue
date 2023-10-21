<script setup lang="ts">
  import { RouterLink } from 'vue-router'
  import GameButton from '../components/GameButton.vue'
  import { createApp, createElementBlock } from 'vue';

</script>

<template>
  <main>
    <h1>CardApp</h1>
    <h2>card game score tracker and calculator</h2>
    <div class="btn tarok" @click="click('tarok')">Tarok</div>
    <div class="btn fr-tarok" @click="click('fr-tarok')">French Tarok</div>
    <div class="btn poker" @click="click('poker')">Poker</div>
    <div class="btn rummy" @click="click('rummy')">Rummy</div>
    <div class="btn lustik" @click="click('lustik')">Lustik</div>
  </main>
</template>

<script lang="ts">

function click(game: string) {
  let lmn: Element = document.body.getElementsByClassName(game)[0]

  const sp = document.createElement('span')
  lmn.innerHTML = ""
  
  createApp(GameButton, { game: game, rules: false }).mount(lmn)
  lmn.innerHTML += " | "
  createApp(GameButton, { game: game, rules: true }).mount(sp)
  lmn.append(sp)
  
}
</script>

<style scoped>
main {
  text-align: center;
}
h1 {
  font-size: 5.5em;
  color:rgb(250, 106, 106);
  margin-top: 1.5em;
  margin-bottom: 0;
}

h2 {
  font-size: 1.15em;
  margin-top: 0.2em;
  margin-bottom: 4em;
}
a {
  text-decoration: none;
  color: white;
}
</style>
