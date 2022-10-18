import { keyBy } from 'lodash-es'
import { defineStore } from 'pinia'

export type Member = {
  id: string
  name: string
}

const createMemberIdGenerator = () => {
  let n = 0

  const generator = function* () {
    while (true) yield `member-${n++}`
  }

  return generator()
}

const memberIdGenerator = createMemberIdGenerator()

export const useMembersStore = defineStore('members', {
  state: () => ({
    list: [] as Member[],
  }),

  getters: {
    ids: ({ list }) => list.map(r => r.id),
    map: ({ list }) => keyBy(list, 'id'),
    length: ({ list }) => list.length,
  },

  actions: {
    add(value: Omit<Member, 'id'>) {
      this.list.push({
        id: memberIdGenerator.next().value,
        ...value,
      })
    },

    removeAt(index: number) {
      this.list = this.list.filter((_, i) => i !== index)
    },

    removeById(id: Member['id']) {
      this.list = this.list.filter(r => r.id !== id)
    },
  },
})
