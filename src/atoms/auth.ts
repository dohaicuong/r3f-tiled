import { atomWithStorage } from 'jotai/utils'

type AuthAtom = {
  oneTimeToken: string
  data: {
    id: string
    jwt: string
    uuid: string
    first_name: string
    last_name: string
    mail: string,
    data: {
      consent: any,
      cinque: {
        avatar: number
        role: string
      }
    }
  }
}

export const authAtom = atomWithStorage<AuthAtom>('cinque_auth', {
  oneTimeToken: '',
  data: {
    id: '',
    jwt: '',
    uuid: '',
    first_name: '',
    last_name: '',
    mail: '',
    data: {
      consent: {},
      cinque: {
        avatar: 0,
        role: ''
      }
    },
  }
})
