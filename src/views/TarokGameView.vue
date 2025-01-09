<script>
import NewRound from './NewRound.vue';
export default {
  data() {
    return {
      items: [], // Initialize empty
    };
  },
  created() {
    const items = this.$route.query.items;
    if (items) {
      this.items = JSON.parse(items); // Parse the JSON string
      console.log(this.items);
      
    }
  },
  components: {
    NewRound,
  },
};
</script>


<template>
  <main>
    <table>
      <tr>
        <td v-for="item in items" :key="item.name">
          {{ item.name }}
        </td>
      </tr>
      <tr class="rad">
        <td v-for="item in items" :key="item.name">
          o
        </td>
      </tr>
      <tr>
        <td v-for="item in items" :key="item.name">
          {{ item.value }}
        </td>
      </tr>
    </table>
    <NewRound class="nrnd" :players="items"></NewRound>
  </main>
</template>

<style>
  td {
    border-bottom: 2pt black solid;
    
  }
  table {
    border-collapse: collapse;
    width: 100%;
    margin: 0;
    padding: 0;

  }
  .nrnd {
    background-color: rgb(250, 106, 106);
    padding: 10pt 20pt;
    color: white;
    position: absolute;
    top: 20pt;
    left: 12%;
    right: 12%;
  }
</style>