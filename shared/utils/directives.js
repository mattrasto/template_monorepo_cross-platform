/* eslint-disable no-param-reassign */
// Global directives

import app from '@/app.js';

// Register a global custom directive called v-focus
// Source: https://stackoverflow.com/a/41297528/3748574
app.directive('focus', {
  // When the bound element is inserted into the DOM...
  inserted(el) {
    // Focus the element
    el.focus();
  }
});

// Register a global custom directive to fade the element out on a condition
app.directive('fade', (el, binding) => {
  if (binding.value) {
    el.style.opacity = 0;
    el.style.pointerEvents = 'none';
    el.style.animation = 'fadeOut 0.2s';
  } else {
    el.style.opacity = 1;
    el.style.pointerEvents = 'all';
    el.style.animation = 'fadeIn 0.2s';
  }
});
