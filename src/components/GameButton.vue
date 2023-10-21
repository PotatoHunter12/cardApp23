<script setup lang="ts">
const props = defineProps<{
  game: string;
  rules?: boolean
}>()
let link = "/" + props.game + (props.rules ? "/rules" : "")
let text = props.rules?"Rules":"Play"
</script>

<template>
  <div class="btn">
    <a :href=link>{{ text }}</a>

  </div>
</template>

<style scoped>
div {
  display: inline;
}

a {
  color: white;
  text-decoration: none;
}
</style>
