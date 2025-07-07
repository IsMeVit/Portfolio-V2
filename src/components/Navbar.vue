<script setup>
import bgImg from '@/assets/Img/fake-bg.jpg';
import { ref } from 'vue';

const isMenuOpen = ref(false);

const navItems = [
  { name: 'Home', href: '#' },
  { name: 'About', href: '#About' },
  { name: 'Projects', href: '#' },
  { name: 'Contact', href: '#' },
];

const closeMenu = () => {
  isMenuOpen.value = false;
};
</script>

<template>
  <div class="relative" style="font-family: 'Space-mono';">
    <div class="absolute inset-0 "></div>

    <div class="fixed top-5.5 left-0 w-full z-50">

      <!-- Mobile menu button -->
      <div class="lg:hidden flex justify-end p-4">
        <button
          @click="isMenuOpen = !isMenuOpen"
          class="p-2 rounded-lg backdrop-blur-md bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#9f85ff] focus:ring-opacity-75 transition-all duration-300"
          aria-label="Toggle navigation menu"
        >
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" v-if="!isMenuOpen">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" v-else>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <!-- Navigation menu -->
      <div
        class="transition-all duration-300 ease-in-out lg:flex lg:justify-center lg:items-center"
        :class="{
          'max-h-0 opacity-0 overflow-hidden lg:max-h-full lg:opacity-100 lg:overflow-visible': !isMenuOpen,
          'max-h-screen opacity-100': isMenuOpen
        }"
      >
        <nav class="backdrop-blur-md bg-white/10 rounded-2xl px-6 py-3 lg:px-8 shadow-lg border border-white/20 w-full mx-auto lg:w-auto flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-8">
          <a
            v-for="item in navItems"
            :key="item.name"
            :href="item.href"
            class="relative py-2 lg:pb-2 w-full text-center lg:w-auto group"
            @click="closeMenu"
          >
            <span class="text-lg text-white font-semibold transition-colors duration-300 group-hover:text-[#9f85ff]">
              {{ item.name }}
            </span>
            <span class="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-[2px] bg-[#9f85ff] transition-all duration-300 ease-in-out w-0 group-hover:w-[70%]"></span>
          </a>

          <div class="w-full h-px bg-white/20 lg:hidden"></div>

          <p class="text-lg text-white hidden lg:block">|</p>

          <a
            href="https://github.com/IsMeVit" target="_blank"
            class="relative py-2 lg:pb-2 w-full text-center lg:w-auto group"
            @click="closeMenu"
          >
            <span class="text-lg text-white font-semibold transition-colors duration-300 group-hover:text-[#9f85ff]">
              Github
            </span>
            <span class="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-[2px] bg-[#9f85ff] transition-all duration-300 ease-in-out w-0 group-hover:w-[70%]"></span>
          </a>
        </nav>
      </div>
    </div>
  </div>
</template>