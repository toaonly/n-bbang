import { setActivePinia, createPinia } from 'pinia'
import { useMembersStore } from '../members'

describe('Member store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('맴버 등록', () => {
    const member = useMembersStore()

    member.add({
      name: 'Member A',
    })

    expect(member.list[0]).toStrictEqual({
      id: 'member-0',
      name: 'Member A',
    })
  })

  it('맴버 등록할 때 `name` 필드가 누락되어 있으면 에러가 발생', () => {
    const member = useMembersStore()

    try {
      member.add({
        name: '',
      })
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
    }
  })

  it('등록된 맴버를 `index` 값으로 삭제할 수 있다', () => {
    const member = useMembersStore()

    member.add({
      name: 'Member A',
    })

    member.removeAt(0)

    expect(member.length).toBe(0)
  })

  it('등록된 맴버를 `id` 값으로 삭제할 수 있다', () => {
    const member = useMembersStore()

    member.add({
      name: 'Member A',
    })

    member.removeById(member.ids[0])

    expect(member.length).toBe(0)
  })
})
