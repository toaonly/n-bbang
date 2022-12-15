<template>
  <div class="flex flex-col gap-4">
    <h3 class="text-center font-semibold">
      엔빵러 등록 ({{ members.length }}th)
    </h3>
    <form @submit.prevent="addMember">
      <div class="flex items-center h-[48px]">
        <input
          v-model="name"
          v-shortcut="'ctrl+alt+c'"
          autofocus
          required
          type="text"
          placeholder="엔빵러 이름"
          class="flex-1 h-full"
        >
        <button
          v-shortcut="'enter'"
          class="w-[80px] h-full bg-blue-500 text-white"
          type="submit"
        >
          등록
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { useMembersStore } from '@/store'

let name = $ref('')
const members = useMembersStore()

const addMember = () => {
  try {
    members.add({ name })
    name = ''
  } catch (error) {
    console.warn(error)
  }
}
</script>
