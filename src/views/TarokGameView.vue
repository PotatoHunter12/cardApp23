<script>
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
          0
        </td>
      </tr>
    </table>
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
</style>