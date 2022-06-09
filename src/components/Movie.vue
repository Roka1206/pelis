<script setup lang="ts">

// @ts-ignore
defineProps<{ title: string ,date: string ,img: string }>()

</script>

<template>
<div v-if="img" style="height:400px; width: 300px; padding:1rem; margin-top:1.5rem; margin-bottom:1.5rem; ">
    <h3>{{ title }}</h3>
    <img :src="`https://image.tmdb.org/t/p/w500${img}?api_key=8f781d70654b5a6f2fa69770d1d115a3`" :alt="title" style="max-height:30rem; max-width: 15rem;">
    <div><strong>{{ date }}</strong></div>  
</div>
</template>

<style scoped>

</style>
