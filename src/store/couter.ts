import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
  }),

  actions: {
    setCount(value: number) {
      console.log(value)
      this.count = value
    },

    increase() {
      this.setCount(this.count + 1)
    },

    decrease() {
      this.setCount(this.count - 1)
    },
  },
})
