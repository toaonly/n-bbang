import { useMembersStore, usePaymentsStore } from './'
import type { Member } from './'

const toFixed = (value: number, fracDigit: number) => +value.toFixed(fracDigit)

export const useCalc = () => {
  const members = useMembersStore()
  const payments = usePaymentsStore()
  const getResultMap = () =>
    members.list.reduce(
      (acc, mem) => {
        const paymentsByMem = payments.findsByMemberId(mem.id)
        const already = paymentsByMem.reduce(
          (result, cur) => result + cur.amount,
          0
        )
        const toBePaid = payments.list
          .filter(p => p.members.find(memId => memId === mem.id))
          .reduce(
            (result, cur) =>
              result + toFixed(cur.amount / cur.members.length, 0),
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
      },
      {} as Record<
        Member['id'],
        {
          already: number // 이미 낸 금액
          toBePaid: number // 내야할 금액
          result: number // 내야할 금액 - 이미 낸 금액 = 최종 지불 금액
        }
      >
    )

  return { getResultMap }
}
