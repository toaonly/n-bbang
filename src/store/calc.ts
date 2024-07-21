import { round } from 'lodash-es'
import { useMembersStore, usePaymentsStore } from './'

import type { Member } from './'
import { computed, watch } from 'vue'

export const useCalc = () => {
  const members = useMembersStore()
  const payments = usePaymentsStore()
  const resultMap = computed(() => {
    return members.list.reduce<
      Record<
        Member['id'],
        {
          already: number // 이미 낸 금액
          toBePaid: number // 내야할 금액
          result: number // 내야할 금액 - 이미 낸 금액 = 최종 지불 금액
        }
      >
    >((acc, mem) => {
      const paymentsByMem = payments.findsByMemberId(mem.id)
      const already = paymentsByMem.reduce(
        (result, cur) => result + cur.amount,
        0
      )
      const toBePaid = payments.list
        .filter(p => p.members.find(memId => memId === mem.id))
        .reduce(
          (result, cur) => result + round(cur.amount / cur.members.length, 0),
          0
        )
      const result = toBePaid - already

      return {
        ...acc,
        [mem.id]: {
          already,
          toBePaid,
          result,
        },
      }
    }, {})
  })
  watch(
    () => [members.list, payments.list],
    () => {
      console.log(resultMap)
    }
  )
  const getResultMap = () =>
    members.list.reduce<
      Record<
        Member['id'],
        {
          already: number // 이미 낸 금액
          toBePaid: number // 내야할 금액
          result: number // 내야할 금액 - 이미 낸 금액 = 최종 지불 금액
        }
      >
    >((acc, mem) => {
      const paymentsByMem = payments.findsByMemberId(mem.id)
      const already = paymentsByMem.reduce(
        (result, cur) => result + cur.amount,
        0
      )
      const toBePaid = payments.list
        .filter(p => p.members.find(memId => memId === mem.id))
        .reduce(
          (result, cur) => result + round(cur.amount / cur.members.length, 0),
          0
        )
      const result = toBePaid - already

      return {
        ...acc,
        [mem.id]: {
          already,
          toBePaid,
          result,
        },
      }
    }, {})

  return { getResultMap }
}
