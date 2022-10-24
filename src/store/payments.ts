import { createIdGenerator } from '@/utils'
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

const paymentIdGenerator = createIdGenerator('payment')

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
    add(value: Omit<Payment, 'id' | 'members'>) {
      this.list.push({
        id: paymentIdGenerator.next().value,
        members: useMembersStore().ids,
        ...value,
      })
    },

    addEmpty() {
      this.add({
        memberId: '',
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
