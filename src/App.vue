<script setup>
import { ref } from 'vue';
import { track } from '@vercel/analytics';

import Home from './components/Home.vue';
import Background from './components/Background.vue';
import Navbar from './components/Navbar.vue';
import About from './components/About.vue';
import Project from './components/Project.vue';
import Contact from './components/Contact.vue';

const currentView = ref('Home'); 

function changeView(viewName) {
  currentView.value = viewName;
  
  track('pageview', { page: `/${viewName}` }); 
}
</script>

<template>
  <div class="relative min-h-screen bg-[#1d2029] text-white flex flex-col items-center justify-center overflow-x-hidden ">
    <Navbar @view-change="changeView"/>
    <Background/>
    <Home v-if="currentView === 'Home'"/>
    <About v-else-if="currentView === 'About'"/>
    <Project v-else-if="currentView === 'Project'"/>
    <Contact v-else-if="currentView === 'Contact'"/>

    

  </div>
</template>