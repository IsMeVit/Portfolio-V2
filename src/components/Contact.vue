<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const Icons = {
  SocialMedia: [
    {
      name: "Linkedin",

      url: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z",

      viewBox: "0 0 24 24",
    },

    {
      name: "Facebook",

      url: "M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z",

      viewBox: "0 0 512 512",
    },

    {
      name: "GitHub",

      url: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.835 2.809 1.305 3.493.998.108-.776.417-1.305.76-1.605-2.665-.304-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.046.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z",

      viewBox: "0 0 24 24",
    },
  ],
};

const getSocialLink = (name) => {
  switch (name) {
    case "Linkedin":
      return "https://www.linkedin.com/in/yourlinkedinprofile/";

    case "Facebook":
      return "https://web.facebook.com/PichsovandaraDevit";

    case "GitHub":
      return "https://github.com/IsMeVit";

    default:
      return "#";
  }
};

const showContactForm = ref(false);

const isMobile = ref(false);

const name = ref("");

const telegram = ref("");

const message = ref("");

const isSent = ref(false);

const honeypot = ref("");

let messageTimeout = null;

const showForm = () => {
  showContactForm.value = true;
};

const showIcon = () => {
  showContactForm.value = false;
};

const handleResize = () => {
  isMobile.value = window.innerWidth < 768;

  if (!isMobile.value) {
    showContactForm.value = true;
  } else if (!showContactForm.value) {
    showContactForm.value = false;
  }
};

onMounted(() => {
  handleResize();
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});

const sendToTelegram = async () => {
  const webhookUrl = "/api/webhook";

  if (messageTimeout) {
    clearTimeout(messageTimeout);

    messageTimeout = null;
  }
  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name.value,
        telegram: telegram.value,
        message: message.value,
        honeypot: honeypot.value,
      }),
    });
    if (res.ok) {
      isSent.value = true;
      name.value = "";
      telegram.value = "";
      message.value = "";
      honeypot.value = "";
      if (isMobile.value) {
        showIcon();
      }
      messageTimeout = setTimeout(() => {
        isSent.value = false;
      }, 5000);
    } else {
      const errorData = await res.json().catch(() => ({}));
      alert(
        `Something went wrong 😓: /n ${
          errorData.message || res.statusText || "Unknown error"
        }`
      );
    }
  } catch (error) {
    console.error("Error sending form:", error);
    alert("Failed to send message. Please try again.");
  }
};
</script>

<template>
  <h1 id="contact" class="text-center text-5xl font-black min-h-[20vh]">
    Contact
  </h1>

  <div
    class="container rounded-2xl shadow-2xl mx-auto p-6 md:p-12 max-w-4xl font-[Space-mono] min-h-screen bg-[#1e2431] text-white"
  >
    <header class="text-center mb-20">
      <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
        Let’s Connect
      </h1>

      <p class="text-lg md:text-xl text-gray-300">
        Got a project or just want to chat? I'm just a message away.
      </p>

      <hr class="border-t-2 border-white mt-12" />
    </header>

    <section class="mb-20">
      <h2
        class="text-3xl font-bold text-white uppercase tracking-widest text-center"
      >
        Find Me Here
      </h2>

      <div class="flex gap-5 justify-center items-center px-6 py-5">
        <a
          v-for="icon in Icons.SocialMedia"
          :key="icon.name"
          :href="getSocialLink(icon.name)"
          target="_blank"
          rel="noopener noreferrer"
          class="hover:text-[#9f85ff] active:text-[#9f85ff] transition-colors duration-200"
        >
          <svg
            :aria-label="icon.name"
            role="img"
            width="42"
            height="42"
            :viewBox="icon.viewBox"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path :d="icon.url"></path>
          </svg>
        </a>
      </div>
    </section>

    <section class="bg-[#2b3245] p-8 md:p-10 rounded-2xl shadow-md relative">
      <div
        v-if="isMobile && !showContactForm"
        @click="showForm"
        class="flex flex-col items-center justify-center py-12 px-4 text-center cursor-pointer"
      >
        <a
          href="#"
          class="text-white hover:text-red-500 transition-colors duration-200"
          aria-label="Open contact form"
          @click.prevent
        >
          <svg
            class="w-20 h-20 mx-auto mb-4"
            viewBox="0 0 240 240"
            fill="currentColor"
          >
            <path
              d="M120,0C53.7,0,0,53.7,0,120s53.7,120,120,120s120-53.7,120-120S186.3,0,120,0z M177.5,82.6l-21.7,102.6

c-1.6,7.4-5.9,9.3-11.8,5.8l-32.5-24.1l-15.7,15.1c-1.7,1.7-3.1,3.1-6.3,3.1l2.3-32.6l59.4-53.6c2.6-2.3-0.6-3.6-4-1.3l-73.3,46

l-31.6-9.9c-6.9-2.2-7-6.9,1.4-10.2l123.6-47.7C173.2,73.4,179.3,75.9,177.5,82.6z"
            />
          </svg>

          <span class="text-xl font-semibold">Telegram</span>

          <p class="text-sm mt-2 text-gray-300">Tap to open form</p>
        </a>
      </div>

      <div
        v-if="showContactForm"
        :class="{ 'md:block': true, hidden: !showContactForm }"
      >
        <h2
          class="text-2xl font-bold mb-8 text-white uppercase tracking-widest"
        >
          Send a Message
        </h2>

        <form @submit.prevent="sendToTelegram" class="space-y-6">
          <div v-if="isMobile" class="text-right mb-4">
            <button
              type="button"
              @click="showIcon"
              class="text-gray-400 hover:text-white active:text-white transition-colors duration-200 text-sm"
            >
              &times; Close Form
            </button>
          </div>

          <div>
            <label
              for="name"
              class="block text-sm font-semibold text-white mb-2"
              >Name</label
            >

            <input
              v-model="name"
              type="text"
              id="name"
              name="name"
              required
              class="w-full px-4 py-3 bg-[#1e2431] text-white border border-purple-700 rounded-lg focus:ring-2 focus:ring-white placeholder-gray-400"
            />
          </div>

          <div>
            <label
              for="telegram"
              class="block text-sm font-semibold text-white mb-2"
              >Telegram</label
            >

            <input
              v-model="telegram"
              type="text"
              id="telegram"
              name="telegram"
              required
              class="w-full px-4 py-3 bg-[#1e2431] text-white border border-purple-700 rounded-lg focus:ring-2 focus:ring-white placeholder-gray-400"
            />
          </div>

          <div>
            <label
              for="message"
              class="block text-sm font-semibold text-white mb-2"
              >Message</label
            >

            <textarea
              v-model="message"
              id="message"
              name="message"
              rows="6"
              required
              class="w-full px-4 py-3 bg-[#1e2431] text-white border border-purple-700 rounded-lg focus:ring-2 focus:ring-white placeholder-gray-400"
              placeholder="Let say hi..."
            ></textarea>
          </div>

          <div style="display: none">
            <label for="honeypot">If you're a human, don't fill this out</label>

            <input
              type="text"
              id="honeypot"
              name="honeypot"
              v-model="honeypot"
            />
          </div>

          <div>
            <button
              type="submit"
              class="w-full px-6 py-3 text-white bg-purple-600 hover:bg-purple-700 active:bg-purple-700 rounded-lg transition transform hover:scale-105 active:scale-105"
            >
              Send 🚀
            </button>

            <p v-if="isSent" class="text-green-400 mt-4 text-center">
              ✅ Message sent!
            </p>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>
