<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const currentIndex = ref(0)
const ifisMobile = ref(window.innerWidth < 768)

const updateScreen = () => {
  ifisMobile.value = window.innerWidth < 768
}

onMounted(() => {
  window.addEventListener('resize', updateScreen)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateScreen)
})

const slideWidth = computed(() => (ifisMobile.value ? 100 : 50)) // 100% if mobile, 50% if md+
const translateX = computed(() => `translateX(-${currentIndex.value * slideWidth.value}%)`)


const projects = [
  {
    title: "My portfolio V1",
    description: "This is my first portfolio created using HTML, CSS, and JavaScript after three months of learning. It marks the beginning of my journey to becoming a web developer.",
    tech: ['HTML', 'CSS', 'Javascript'],
    link: "https://ismevit.github.io/"
  },
  {
    title: "Vue-colculator",
    description: "It's just a basic project.",
    tech: ['Vue.js', 'Vuex', 'Tailwind CSS', 'Firebase'],
    link: "#"
  },
  {
    title: "UX/UI Design project",
    description: "It's my school project in my UX/UI course.",
    tech: ['Vue.js', 'Vuex', 'Tailwind CSS', 'Firebase'],
    link: "#"
  },
  {
    title: "Something New...",
    description: "",
    tech: ['Vue.js', 'Vuex', 'Tailwind CSS', 'Firebase'],
    link: "#"
  }
]
const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + projects.length) % projects.length
}

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % projects.length
}
</script>

<template>
  <div class="min-h-screen w-full overflow-hidden font-[Space-Mono] text-white ">
    <h1 id="project" class="text-center text-5xl font-black md:mb-12 min-h-[15vh]">My Projects</h1>
  
    <div class="relative max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-0 flex items-center justify-center ">
      <button @click="prevSlide" class="absolute left-1 md:left-0 z-10 p-3 rounded-full">
        <span class="text-yellow-300 bg-[#1e2431] hover:bg-[#452c2c] active:bg-[#452c2c]">&lt;</span>
      </button>

      <div class="overflow-hidden w-full max-w-4xl">
        <div class="flex transition-transform duration-500 ease-in-out" :style="{ transform: translateX }">
          <div v-for="(project, index) in projects" :key="index" class="min-w-full md:min-w-1/2 flex justify-center">
            <div class="bg-[#1e2431] rounded-lg p-6 w-70 md:w-80 mb-6 md:mb-0 shadow-md text-left">
              <h3 class="text-xl font-bold mb-2">{{ project.title }}</h3>
              <p class="mb-4">{{ project.description }}</p>
              <div class="flex flex-wrap gap-2 mb-4">
                <span v-for="(tech, i) in project.tech" :key="i" class="bg-blue-700 text-sm px-2 py-1 rounded text-white">
                  {{ tech }}
                </span>
              </div>
              <a :href="project.link" target="_blank" class="text-blue-400 hover:underline active:underline">View Project</a>
            </div>
          </div>
        </div>
      </div>

      <button @click="nextSlide" class="absolute right-1 md:right-0 z-10 bg-[#1e2431] hover:bg-[#2c3445] p-3 rounded-full">
        <span class="text-yellow-300 active:bg-[#452c2c]">&gt;</span>
      </button>
    </div>

    <div class="mt-6 flex justify-center space-x-2">
      <span
        v-for="(dot, i) in projects"
        :key="i"
        class="w-3 h-3 rounded-full cursor-pointer"
        :class="currentIndex === i ? 'bg-yellow-400' : 'bg-yellow-300 opacity-70'"
        @click="currentIndex = i"
      ></span>
    </div>    
  </div>
</template>
