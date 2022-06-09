<script setup lang="ts">
import { ref } from 'vue'
import {fetchApiData} from "../api/http"
// @ts-ignore
import Movie from "./Movie.vue"
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogDescription,
} from '@headlessui/vue'

  const isOpen = ref(true)

  function setIsOpen(value:any) {
    isOpen.value = value
  }

const searchInput = ref("")
const searchResults = ref("")
const selectedMovie = ref({})

const search = () => {
  fetchApiData(searchInput?.value).then((data:any) => {
    console.log(data)
    searchResults.value = data.results
  })
}
const selectMovie = (movie:any) => {
    selectedMovie.value = movie
    setIsOpen(true)
}
</script>

<template>
  <div>
    <h1>Buscador</h1>
    <input type="text" v-model="searchInput"/>
    <button @click="search" >Buscar</button>
  </div>
  <div>
    <h1>Resultados</h1>
    <section v-if="searchResults" style="display:flex; justify-content:space-around; align-items:center; flex-wrap:wrap;">
      <Movie v-for="result,index in searchResults" :key="index" :title="result.title" :date="result.release_date" :img="result.poster_path" @click="selectMovie(result)"/>
    </section>
  </div>
  <Dialog v-if="selectedMovie" :open="isOpen" @close="setIsOpen" style="position:absolute; left:50%; top:50%; background-color:white; padding:1rem; transform:translate(-50%, 50%);box-shadow: 5px 5px 15px 3px rgba(0,0,0,0.75); border-color:gray;">
    <DialogPanel>
      <DialogTitle style="text-align:center;">{{selectedMovie.title}}</DialogTitle>
      <img :src="`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}?api_key=8f781d70654b5a6f2fa69770d1d115a3`" :alt="title" style="max-height:30rem; max-width: 15rem;">
    <div><strong>{{ date }}</strong></div>
    </DialogPanel>
  </Dialog>
</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
