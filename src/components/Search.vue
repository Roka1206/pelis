<script setup lang="ts">

import { ref } from "vue";
import { fetchApiData } from "../api/http";
import { useStore, IComment } from "../hooks";
// @ts-ignore
import Movie from "./Movie.vue";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogDescription,
} from "@headlessui/vue";
const { addComment } = useStore();
const isOpen = ref(false);

function setIsOpen(value: any) {
  isOpen.value = value;
}

const searchInput = ref("");
const searchResults = ref("");
const selectedMovie = ref({});

const formName = ref("");
const formComment = ref("");
const formPuntuation = ref(1);

const search = () => {
  fetchApiData(searchInput?.value).then((data: any) => {
    console.log(data);
    searchResults.value = data.results;
  });
};

const selectMovie = (movie: any) => {
  selectedMovie.value = movie;
  setIsOpen(true);
};

const handleSubmit = (e: any) => {
  e.preventDefault();
  const comment: IComment = {
    name: formName?.value,
    comment: formComment?.value,
    points: Number(formPuntuation?.value),
  };
  console.log(
    "🚀 ~ file: Search.vue ~ line 48 ~ handleSubmit ~ comment",
    comment
  );
  addComment(comment);
  formName.value = "";
  formComment.value = "";
  formPuntuation.value = 1;
  setIsOpen(false);
};

const handleCancel = (e: any) => {
  e.preventDefault();
  formName.value = "";
  formComment.value = "";
  formPuntuation.value = 1;
  setIsOpen(false);
};
</script>

<template>
  <div>
    <h2>Buscador</h2>
    <input type="text" v-model="searchInput" />
    <button @click="search">Buscar</button>
  </div>
  <div>
    <h1>Resultados</h1>
    <section
      v-if="searchResults"
      style="
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-wrap: wrap;
      "
    >
      <Movie
        v-for="(result, index) in searchResults"
        :key="index"
        :title="result?.title"
        :date="result.release_date"
        :votes="result.vote_average"
        :img="result.poster_path"
        @click="selectMovie(result)"
      />
    </section>
  </div>
  <Dialog
    :open="isOpen"
    @close="setIsOpen"
    style="
      position: fixed;
      top: 5%;
      background-color: white;
      padding: 1rem;
      box-shadow: 5px 5px 15px 3px rgba(0, 0, 0, 0.75);
      border-color: gray;
      width: 1000px;
      height: 500px;
    "
  >
    <DialogPanel
      style="display: flex; align-items: center; justify-content: space-around"
    >
      <div>
        <DialogTitle style="text-align: center">{{
          selectedMovie?.title
        }}</DialogTitle>
        <img
          :src="`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}?api_key=8f781d70654b5a6f2fa69770d1d115a3`"
          :alt="selectedMovie?.title"
          style="max-height: 30rem; max-width: 15rem"
        />
        <div style="text-align: center">
          <strong>{{ selectedMovie.release_date }}</strong>
        </div>
        <div style="text-align: center">
          <strong>{{ selectedMovie.vote_average }}</strong>
        </div>
      </div>
      <div style="padding: 1rem">
        <div>
          <h2>Titulo original</h2>
          <p>{{ selectedMovie.original_title }}</p>
        </div>
        <div>
          <h2>Descripcion</h2>
          <p>{{ selectedMovie.overview }}</p>
        </div>
        <form
          style="
            display: flex;
            flex-direction: column;
            align-items: start;
            justify-content: space-between;
            padding: 1rem;
          "
          :onSubmit="handleSubmit"
        >
          <div style="display: flex">
            <label for="nombre"> Nombre: </label>
            <input id="nombre" type="text" required v-model="formName" />
          </div>
          <div style="display: flex">
            <label for="comentario"> Comentario: </label>
            <textarea
              name="comentario"
              id="comentario"
              v-model="formComment"
              cols="50"
              rows="5"
              no-resize
              required
            ></textarea>
          </div>
          <div style="display: flex; margin-top: 1rem">
            <label for="puntuation"> Puntuacion: </label>
            <input
              id="puntuation"
              type="number"
              min="1"
              max="10"
              required
              v-model="formPuntuation"
            />
          </div>
          <div
            style="
              display: flex;
              align-items: center;
              justify-content: end;
              align-self: end;
            "
          >
            <button
              style="
                backgroundcolor: #d43636;
                color: red;
                padding: 0.7rem;
                cursor: pointer;
              "
              :onClick="handleCancel"
            >
              Cancel
            </button>
            <button
              style="
                backgroundcolor: #21d833;
                color: blue;
                padding: 0.7rem;
                margin: 0px 1rem 0px 1rem;
                cursor: pointer;
              "
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </DialogPanel>
  </Dialog>
</template>

<style scoped>
a {
  color: #d43636;
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
