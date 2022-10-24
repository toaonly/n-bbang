<template>
  <div class="flex-1 p-4">
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
            <div class="text-center">
              합계
            </div>
          </td>
          <td colspan="3">
            <div class="amount">
              {{ Intl.NumberFormat('ko-KR', {
                currency: 'KRW'
              }).format(payments.totalAmount) }}
            </div>
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
                <div class="inline-flex items-center gap-1">
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
              class="amount"
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
              v-shortcut="'ctrl+alt+a'"
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
</template>

<script lang="ts" setup>
import { useMembersStore, usePaymentsStore } from '@/store'

const members = useMembersStore()
const payments = usePaymentsStore()
</script>

<style lang="scss" scoped>
</style>