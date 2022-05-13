import { atomWithStorage } from 'jotai/utils'

type InitialAtom = {
  initial: boolean;
}

export const initialAtom = atomWithStorage<InitialAtom>('initial', {
  initial: false
})