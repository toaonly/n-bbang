<template>
  <div class="flex w-full h-screen divide-x divide-gray-700">
    <div class="flex flex-col flex-1 p-4 gap-4 divide-y divide-gray-700">
      <div class="flex flex-col gap-4">
        <h3 class="text-center font-semibold">
          엔빵러 등록 ({{ members.length }}th)
        </h3>
        <form @submit.prevent="addMember">
          <div class="flex items-center h-[48px]">
            <input
              v-model="name"
              v-shortcut="'ctrl+alt+r'"
              autofocus
              required
              type="text"
              class="flex-1 h-full"
            >
            <button
              v-shortcut="'enter'"
              class="w-[80px] h-full bg-blue-500 text-white"
              type="submit"
            >
              추가
            </button>
          </div>
        </form>
      </div>

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
    </div>
    <div class="flex-[2] p-4">
      <table>
        <colgroup>
          <col
            span="2"
            style="width: 20%"
          >
          <col style="width: 30%">
          <col style="width: 20%">
          <col>
        </colgroup>
        <thead>
          <tr>
            <th>카드 긁은 놈</th>
            <th>내역</th>
            <th>파티원</th>
            <th colspan="2">
              금액
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="2">
              합계
            </td>
            <td colspan="3">
              {{ Intl.NumberFormat('ko-KR', {
                currency: 'KRW'
              }).format(payments.totalAmount) }}
            </td>
          </tr>
          <tr
            v-for="payment in payments.list"
            :key="payment.id"
          >
            <td>
              <select
                v-model="payment.memberId"
                class="w-full"
              >
                <option
                  v-for="member in members.list"
                  :key="member.id"
                  :value="member.id"
                >
                  {{ member.name }}
                </option>
              </select>
            </td>
            <td>
              <input
                v-model="payment.summary"
                type="text"
              >
            </td>
            <td>
              <div class="flex items-center gap-3">
                <template
                  v-for="member in members.list"
                  :key="member.id"
                >
                  <div class="inline-flex">
                    <label :for="`pm-m-${payment.id}-${member.id}`">{{ member.name }}</label>
                    <input
                      :id="`pm-m-${payment.id}-${member.id}`"
                      v-model="payment.members"
                      :name="`pm-m-${payment.id}-${member.id}`"
                      type="checkbox"
                      :value="member.id"
                    >
                  </div>
                </template>
              </div>
            </td>
            <td>
              <input
                v-model.number="payment.amount"
                type="number"
                min="0"
              >
            </td>
            <td>
              <button
                class="bg-red-500 text-white w-full"
                @click="payments.removeById(payment.id)"
              >
                삭제
              </button>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="5">
              <button
                v-shortcut="'ctrl+a'"
                class="bg-blue-500 text-white w-full h-12"
                @click="payments.addEmpty"
              >
                내역 추가
              </button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
    <div class="flex-[2] p-4">
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
            <th />
            <th :colspan="members.length">
              엔빵러
            </th>
          </tr>
          <tr v-if="members.length">
            <th />
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
              <span>
                {{ Intl.NumberFormat('ko-KR', { currency: 'KRW' }).format(calc.getResultMap()[member.id]?.already) }}
              </span>
            </td>
          </tr>
          <tr>
            <td>내야핼 금액</td>
            <td
              v-for="member in members.list"
              :key="member.id"
            >
              <span>
                {{ Intl.NumberFormat('ko-KR', { currency: 'KRW' }).format(calc.getResultMap()[member.id]?.toBePaid) }}
              </span>
            </td>
          </tr>
          <tr>
            <td>차액</td>
            <td
              v-for="member in members.list"
              :key="member.id"
            >
              <span>
                {{ Intl.NumberFormat('ko-KR', { currency: 'KRW' }).format(calc.getResultMap()[member.id]?.result) }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCalc, useMembersStore, usePaymentsStore } from '@/store'

let name = $ref('')
const calc = useCalc()
const members = useMembersStore()
const payments = usePaymentsStore()

const addMember = () => {
  if (!name) return

  members.add({ name })
  name = ''
}
</script>

<style scoped lang="scss">
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
</style>