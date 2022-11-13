<template>
  <metainfo />
  <!-- <div id="app">
    <div
      id="app-container"
      :class="{
        'full-screen-height': desktopLanding,
        'hide-scrollbar': true
      }"
    >
      <p>Hello World</p>
      <router-view></router-view>
    </div>
  </div> -->
  <p>Hello World</p>
</template>

<script>
import { CONFIG } from '@config';
import { useMeta } from 'vue-meta';
import { metaInfo } from './metaInfo.js';

const analytics = require('@utils/analytics');

export default {
  name: 'App',
  setup() {
    useMeta(metaInfo);
  },
  data() {
    return {
      windowWidth: window.innerWidth,
      showLoadingState: false,
      lastActiveInterval: null,
    };
  },
  async created() {
    if (CONFIG.environment === 'development')
      console.warn('⚠️ Propheta Platform - Development Version ⚠️'); // eslint-disable-line no-console
    else if (CONFIG.environment === 'staging')
      console.warn('✔️ Propheta Platform - Staging Version ✔️'); // eslint-disable-line no-console

    // if (!this.$store.getters.isBot) {
    //   await this.$store.dispatch('AUTH_VERIFY');
    //   await this.$store.dispatch('ENSURE_USER');
    // }

    // Initialize analytics clients
    analytics.init();
  },
  async mounted() {
    this.windowWidth = window.innerWidth;
    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth;
    });
  },
};
</script>

<style>
* {
  box-sizing: border-box;
  font-family: var(--propheta-regular-font);
}

body,
html {
  font-size: 18px;
  height: 100%;
  width: 100vw;
  margin: 0;
  background-color: #fafafa;
  overscroll-behavior-y: none;
  position: fixed;
}

html.scroll,
body.scroll {
  height: auto;
  position: relative;
  overflow-y: scroll;
  scrollbar-width: none; /* Firefox */
}

/* Safari and Chrome */
html.scroll::-webkit-scrollbar,
body.scroll::-webkit-scrollbar {
  display: none;
}

#app {
  height: 100vh;
  width: 100vw;
}

#app-container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: white;
  display: inline-block;
}

#app-container.scroll {
  overflow-y: scroll !important;
  position: relative !important;
}

p {
  margin: 0;
}

img {
  -webkit-touch-callout: none; /* iOS Safari */
  user-select: none; /* Safari */
  user-select: none; /* Konqueror HTML */
  user-select: none; /* Old versions of Firefox */
  user-select: none; /* Internet Explorer/Edge */
  user-select: none;
}

@font-face {
  font-family: 'Niveau Grotesk Regular';
  src: url('@static/fonts/Niveau Grotesk Regular.otf');
}

@font-face {
  font-family: 'Niveau Grotesk Light';
  src: url('@static/fonts/Niveau Grotesk Light.otf');
}

@font-face {
  font-family: 'Niveau Grotesk Medium';
  src: url('@static/fonts/Niveau Grotesk Medium.otf');
}

@font-face {
  font-family: Quicksand;
  src: url('@static/fonts/Quicksand.ttf') format('truetype-variations');
}
</style>
