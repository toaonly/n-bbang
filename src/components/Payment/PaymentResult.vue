<template>
  <div class="flex-1 p-4">
    <table>
      <colgroup>
        <col style="width: 120px">
        <col
          :span="members.length"
          :style="`width: calc(${100 / (members.length)}% - 120px);`"
        >
      </colgroup>
      <thead>
        <tr>
          <th rowspan="2" />
          <th :colspan="members.length">
            엔빵러
          </th>
        </tr>
        <tr v-if="members.length">
          <th
            v-for="member in members.list"
            :key="member.id"
          >
            {{ member.name }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>미리 낸 금액</td>
          <td
            v-for="member in members.list"
            :key="member.id"
          >
            <div class="amount">
              {{ Intl.NumberFormat('ko-KR', { currency: 'KRW' }).format(calc.getResultMap()[member.id]?.already) }}
            </div>
          </td>
        </tr>
        <tr>
          <td>내야핼 금액</td>
          <td
            v-for="member in members.list"
            :key="member.id"
          >
            <div class="amount">
              {{ Intl.NumberFormat('ko-KR', { currency: 'KRW' }).format(calc.getResultMap()[member.id]?.toBePaid) }}
            </div>
          </td>
        </tr>
        <tr>
          <td>차액</td>
          <td
            v-for="member in members.list"
            :key="member.id"
          >
            <div class="amount">
              {{ Intl.NumberFormat('ko-KR', { currency: 'KRW' }).format(calc.getResultMap()[member.id]?.result) }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { useCalc, useMembersStore } from '@/store'

const calc = useCalc()
const members = useMembersStore()
</script>

<style lang="scss" scoped>
</style>