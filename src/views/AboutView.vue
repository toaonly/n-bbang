<template>
  <div class="text-center">
    About Page
    <br>
    <br>
    <button @click="back">
      Back
    </button>
    <div class="my-2 flex gap-2 justify-center">
      <button @click="increase">
        Increase
      </button>
      <button @click="decrease">
        Decrease
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { useCounterStore } from '@/store'


const router = useRouter()
const { increase, decrease } = useCounterStore()
const back = () => {
  router.back()
}
</script>

<style lang="scss" scoped>
button {
  @apply py-2 px-4;
  @apply capitalize;
  @apply bg-gray-800 dark:bg-stone-100;
  @apply rounded-md;
  @apply text-stone-100 dark:text-gray-800;
}
</style>