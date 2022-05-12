import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

type AuthAtom = {
  oneTimeToken: string
  data: {
    id: string
    jwt: string
    data: string
    uuid: string
    first_name: string
    last_name: string
    mail: string
  }
}

export const authAtom = atomWithStorage<AuthAtom>('cinque_auth', {
  oneTimeToken: '',
  data: {
    id: '',
    jwt: '',
    data: '',
    uuid: '',
    first_name: '',
    last_name: '',
    mail: '',
  }
})
