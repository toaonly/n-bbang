import { setActivePinia, createPinia } from 'pinia'
import { useMembersStore } from '../members'
import { usePaymentsStore } from '../payments'
import membersMock from './members.mock.json'

const mock = {
  members: {} as ReturnType<typeof useMembersStore>,
}

describe('Payments store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())

    mock.members = useMembersStore()
    mock.members.list = membersMock
  })

  it('결제 내역 등록', () => {
    const payments = usePaymentsStore()

    payments.add({
      amount: 1000,
      memberId: mock.members.list[0].id,
      summary: '스타벅스',
    })

    payments.add({
      amount: 2000,
      memberId: mock.members.list[1].id,
      summary: '이디야',
    })

    expect(payments.list).toStrictEqual([
      {
        amount: 1000,
        id: 'payment-0',
        memberId: mock.members.list[0].id,
        members: mock.members.ids,
        summary: '스타벅스',
      },
      {
        amount: 2000,
        id: 'payment-1',
        memberId: mock.members.list[1].id,
        members: mock.members.ids,
        summary: '이디야',
      },
    ])
  })

  it('등록한 결제 내역의 `amount` 합과 `totalAmount` 가 동일하다', () => {
    const payments = usePaymentsStore()

    payments.add({
      amount: 1000,
      memberId: mock.members.list[0].id,
      summary: '스타벅스',
    })

    payments.add({
      amount: 2000,
      memberId: mock.members.list[1].id,
      summary: '이디야',
    })

    expect(payments.totalAmount).toBe(3000)
  })

  it('`memberId` 로 결제 내역을 가져올 수 있다.', () => {
    const payments = usePaymentsStore()

    payments.add({
      amount: 1000,
      memberId: mock.members.list[0].id,
      summary: '스타벅스',
    })

    payments.add({
      amount: 2000,
      memberId: mock.members.list[0].id,
      summary: '이디야',
    })

    payments.add({
      amount: 3000,
      memberId: mock.members.list[1].id,
      summary: '폴바셋',
    })

    expect(payments.findsByMemberId(mock.members.ids[0]).length).toBe(2)
    expect(payments.findsByMemberId(mock.members.ids[1]).length).toBe(1)
    expect(payments.findsByMemberId(mock.members.ids[2]).length).toBe(0)
  })

  it('등록된 결제 내역을 `index` 값으로 삭제할 수 있다', () => {
    const payments = usePaymentsStore()

    payments.add({
      amount: 1000,
      memberId: mock.members.list[0].id,
      summary: '스타벅스',
    })

    payments.removeAt(0)

    expect(payments.length).toBe(0)
  })

  it('등록된 결제 내역을 `id` 값으로 삭제할 수 있다', () => {
    const payments = usePaymentsStore()

    payments.add({
      amount: 1000,
      memberId: mock.members.list[0].id,
      summary: '스타벅스',
    })

    payments.removeById(payments.list[0].id)

    expect(payments.length).toBe(0)
  })
})
