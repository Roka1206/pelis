<script setup lang="ts">
import "./assets/main.css";
</script>

<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/search">Search</router-link> |
    <router-link to="/my_list">My list</router-link>
  </div>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
