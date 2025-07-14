<script setup>
import { ref, onMounted } from 'vue'

const words = ['Davit', 'Ashtro']
const currentWord = ref('')
const Greeting = ref('')
let wordIndex = 0

onMounted(() => {
  GreetingText()
  typeWord()
})

function GreetingText() {
  const text = 'Hey there!'
  let i = 0
  const type = () => {
    if (i < text.length) {
      Greeting.value += text[i++]
      setTimeout(type, 100)
    }
  }
  type()
}

function typeWord() {
  const word = words[wordIndex]
  let charIndex = 0
  currentWord.value = ''

  const type = () => {
    if (charIndex < word.length) {
      currentWord.value += word[charIndex++]
      setTimeout(type, 150)
    } else {
      setTimeout(eraseWord, 2000)
    }
  }

  type()
}

function eraseWord() {
  const word = currentWord.value
  let charIndex = word.length

  const erase = () => {
    if (charIndex > 0) {
      currentWord.value = word.slice(0, --charIndex)
      setTimeout(erase, 100)
    } else {
      wordIndex = (wordIndex + 1) % words.length
      setTimeout(typeWord, 500)
    }
  }

  erase()
}
</script>

<template>
  <div class="relative min-h-screen bg-[#1d2029] text-white flex flex-col items-center justify-center sm:text-center" style="font-family: 'Space-mono';">
    <h1 class="font-[1000] text-6xl mb-2 min-h-[6vh] whitespace-nowrap overflow-hidden border-r-2 border-white sm:text-6xl typewriter-text">
    {{ Greeting }}
    </h1>
    <h2 class="font-bold text-5xl min-h-[8vh]">
      It's me <span class="text-[#9f85ff] typewriter-text">{{ currentWord }}</span>
    </h2>
    <h2 class="font-light text-3xl">Web developer & Web designer</h2>
  </div>
</template>

<style scoped>
.typewriter-text {
  animation: blink 0.7s step-end infinite;
}

@keyframes blink {
  0%, 100% { border-color: white; }
  50% { border-color: transparent; }
}
</style>

