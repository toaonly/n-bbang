<template>
  <div class="flex-1 overflow-auto py-4">
    <div class="flex flex-col gap-2 h-auto">
      <div
        v-for="member in members.list"
        :key="member.id"
        class="flex items-center h-[48px]"
      >
        <input
          v-model="member.name"
          type="text"
          class="flex-1 h-full"
        >
        <button
          class="w-[80px] h-full bg-red-500 text-white"
          @click="members.removeById(member.id)"
        >
          삭제
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useMembersStore } from '@/store'

const members = useMembersStore()
</script>
