import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export const authAtom = atomWithStorage('cinque_auth', {
  oneTimeToken: '',
  data: {
    jwt: ''
  }
})
