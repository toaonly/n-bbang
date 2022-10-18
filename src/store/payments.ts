import { keyBy } from 'lodash-es'
import { defineStore } from 'pinia'
import { Member, useMembersStore } from './members'

export type Payment = {
  id: string
  memberId: Member['id']
  members: Member['id'][]
  summary: string
  amount: number
}

const createPaymentIdGenerator = () => {
  let n = 0

  const generator = function* () {
    while (true) yield `payment-${n++}`
  }

  return generator()
}

const paymentIdGenerator = createPaymentIdGenerator()

export const usePaymentsStore = defineStore('payments', {
  state: () => ({
    list: [] as Payment[],
  }),

  getters: {
    map: ({ list }) => keyBy(list, 'id'),
    length: ({ list }) => list.length,
    totalAmount: ({ list }) => list.reduce((result, r) => result + r.amount, 0),
  },

  actions: {
    add(value: Omit<Payment, 'id'>) {
      this.list.push({
        id: paymentIdGenerator.next().value,
        ...value,
      })
    },

    addEmpty() {
      this.list.push({
        id: paymentIdGenerator.next().value,
        memberId: '',
        members: useMembersStore().ids,
        summary: '',
        amount: 0,
      })
    },

    findsByMemberId(memId: Payment['memberId']) {
      return this.list.filter(r => r.memberId === memId)
    },

    removeAt(index: number) {
      this.list = this.list.filter((_, i) => i !== index)
    },

    removeById(id: Payment['id']) {
      this.list = this.list.filter(r => r.id !== id)
    },
  },
})
