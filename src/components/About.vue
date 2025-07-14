<script setup>
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
      return "https://www.facebook.com/yourfacebookprofile/";
    case "GitHub":
      return "https://github.com/yourgithubprofile/";
    default:
      return "#";
  }
};
</script>

<template>
  <div class="font-[Space-Mono] min-h-screen text-white px-6 py-16">
    <h1 class="text-5xl font-black text-center mb-12">About</h1>

    <div class="flex flex-col md:flex-row md:items-start items-center gap-8 max-w-6xl mx-auto">
      <img
        class="border-4 border-black rounded-2xl w-64 md:w-90 shadow-xl"
        src="/Img/photo_2025-07-02_09-49-00.jpg"
        alt="Profile Image"
      />

      <div class="text-left max-w-2xl">
        <h2 class="text-3xl font-bold mb-3">
          I'm <span class="text-[#9f85ff] font-black">Pich Sovan Dara Davit</span>
        </h2>
        <p class="text-gray-300 text-lg leading-relaxed mb-6">
          I’m a passionate developer focused on building intuitive and high-performing web experiences. My approach is user-first, clean-code driven, and constantly evolving with modern technologies.
        </p>

        <div class="flex gap-5">
          <a
            v-for="icon in Icons.SocialMedia"
            :key="icon.name"
            :href="getSocialLink(icon.name)"
            target="_blank"
            rel="noopener noreferrer"
            class="hover:text-[#9f85ff] transition-colors duration-200"
          >
            <svg
              :aria-label="icon.name"
              role="img"
              width="28"
              height="28"
              :viewBox="icon.viewBox"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path :d="icon.url"></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
