<template>
  <div class="text-center">
    <div class="logo" />
    <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
    <div>
      <button @click="theme = isDark ? 'light' : 'dark'">
        To {{ isDark ? 'light' : 'dark' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from '@/components/HelloWorld.vue'
import { watch } from 'vue'

let theme = $ref('light')
const isDark = $computed(() => theme === 'dark')

watch(() => theme, () => {
  document.querySelector('html')?.classList.toggle('dark', isDark)
})
</script>

<style lang="scss" scoped>
div.logo {
  display: inline-block;
  width: 200px;
  height: 200px;
  background-size: cover;
  background-image: url('/assets/logo.png');
  animation: rotation infinite 2s cubic-bezier(0.19, 1, 0.22, 1);
}

button {
  @apply py-2 px-4;
  @apply capitalize;
  @apply bg-gray-800 dark:bg-stone-100;
  @apply rounded-md;
  @apply text-stone-100 dark:text-gray-800;
}

@keyframes rotation {
  from {
    transform: rotateY(0deg);
  }
  to {
    transform: rotateY(360deg);
  }
}
</style>
