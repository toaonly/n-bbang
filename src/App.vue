<template>
  <div class="flex w-full h-screen divide-gray-700 xs:flex-col xs:divide-y xl:flex-row xl:divide-x">
    <div class="flex flex-col flex-1 p-4 gap-4 divide-y divide-gray-700">
      <Member.Registration />
      <Member.List />
    </div>
    <div class="flex flex-[4] divide-gray-700 xs:flex-col xs:divide-y xl:flex-row xl:divide-x">
      <Payment.Registration />
      <Payment.Result />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Member, Payment } from './components'
</script>

<style lang="scss">
input[type="text"] {
  @apply flex-1 h-full px-3;  
}

table {
  @apply w-full;

  th, td {
    @apply border border-gray-700;
  }

  td {
    input[type="number"], input[type="text"] {
      @apply p-0;
      @apply w-full;
    }
  }
}

.amount {
  @apply text-right;
}
</style>