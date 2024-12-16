<!-- ScrollableGrid.vue -->
<template>
    <div>
        <h1>Profile</h1>
        <div class="content">profil al neki idk</div>
        <button class="btn" @click="back">Back</button>
    </div>
</template>

<script>
export default {
    methods: {
        back() {
            this.$router.push({name: 'home'});
        }
    }
}

</script>

<style scoped>
    .content{
        padding-bottom: 20pt;
    }
</style>
