import { atom } from 'jotai'
import { atomFamily } from 'jotai/utils'

export type Collidable = {
  id: string
  x?: number
  y?: number
  width?: number
  height?: number
}

export const collidableFamily = atomFamily(
  ({
    x = 0,
    y = 0,
    width = 1,
    height = 1,
  }: Collidable) => atom({ x, y, width, height }),
  (a, b) => a.id === b.id
)
