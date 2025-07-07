<script setup>
import Home from './components/Home.vue';
import Background from './components/Background.vue';
import Navbar from './components/Navbar.vue';
import About from './components/About.vue';
import Project from './components/Project.vue';
</script>

<template>
  <div class="relative min-h-screen bg-[#1d2029] text-white flex flex-col items-center justify-center">
    <Navbar/>
    <Home/>
    <Background/>
    <About/>
    <Project/>
    

  </div>
</template>