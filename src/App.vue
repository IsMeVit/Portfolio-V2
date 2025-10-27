<script setup>
import Home from './components/Home.vue';
import Background from './components/Background.vue';
import Navbar from './components/Navbar.vue';
import About from './components/About.vue';
import Project from './components/Project.vue';
import Contact from './components/Contact.vue';
</script>

<template>
  <div class="relative min-h-screen bg-[#1d2029] text-white flex flex-col items-center justify-center overflow-x-hidden">
    <Navbar/>
    <Home/>
    <Background/>
    <About/>
    <Project/>
    <Contact/>

    

  </div>
</template>