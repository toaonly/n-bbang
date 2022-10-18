<template>
  <div class="text-center py-4">
    <router-link
      active-class="text-teal-600 font-bold"
      to="/"
    >
      Home
    </router-link>|
    <router-link
      active-class="text-teal-600 font-bold"
      to="/about"
    >
      About
    </router-link>
  </div>
  <div class="text-lg py-4 text-center border-t border-b border-gray-400 dark:border-stone-400">
    count : {{ count }}
  </div>
  <router-view />
</template>

<script setup  lang="ts">
import { useCounterStore } from './store'

const { count } = $(useCounterStore())
</script>
