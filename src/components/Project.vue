<script setup>
const projects = [
  {
    title: "My portfolio V1",
    description: "This is my first portfolio using HTML, CSS and Javascript after learing for 3months. That's also my first journey to become a web-developer.",
    image: "/Img/Screenshot From 2025-07-07 12-18-34.png",
    link: "https://ismevit.github.io/"
  },
  {
    title: "Vue-colculator",
    description: "It's just a basic project.",
    image: "/Img/loading.gif",
    link: "#"
  },
  {
    title: "UX/UI Design project",
    description: "It's my school project in my UX/UI course.",
    image: "/Img/loading.gif",
    link: "#"
  },
  {
    title: "Something New...",
    // description: "",
    image: "/Img/loading.gif",
    // link: "#"
  }
]
</script>

<template>
  <div class="min-h-screen text-white px-6 py-12">
    <h1 class="text-center text-5xl font-extrabold mb-10 tracking-tight min-h-[15vh]">My Projects</h1>
    
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      <div
        v-for="(project, index) in projects"
        :key="index"
        class="bg-white/10 border border-white/20 p-5 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
      >
        <img
          :src="project.image"
          :alt="project.title"
          class="rounded-xl w-full h-70 object-cover mb-4"
        />
        <h2 class="text-xl font-bold mb-2">{{ project.title }}</h2>
        <p class="text-gray-400 mb-4">{{ project.description }}</p>
        <a
          :href="project.link"
          class="inline-block bg-white text-black px-4 py-2 rounded-xl font-semibold hover:bg-gray-200 hover:underline transition"
        >
          View Project
        </a>
      </div>
    </div>
  </div>
</template>
