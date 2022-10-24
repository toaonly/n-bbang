import { createIdGenerator } from '@/utils'
import { keyBy } from 'lodash-es'
import { defineStore } from 'pinia'

export type Member = {
  id: string
  name: string
}

const memberIdGenerator = createIdGenerator('member')

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
      if (!value.name) throw Error('멤버 이름을 입력하세요')

      this.list.push({
        id: memberIdGenerator.next().value,
        ...value,
      })
    },

    _removeAt(idOrIndex: Member['id'] | number) {
      this.list = this.list.filter((r, i) =>
        typeof idOrIndex === 'number' ? idOrIndex !== i : r.id !== idOrIndex
      )
    },

    removeAt(index: number) {
      this._removeAt(index)
    },

    removeById(id: Member['id']) {
      this._removeAt(id)
    },
  },
})
