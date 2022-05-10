import { useMemo } from 'react'
import { Direction } from './usePlayerInput'

export type AnimationSchema = {
  attack_up: number
  attack_right: number
  attack_left: number
  attack_down: number

  walk_up: number
  walk_right: number
  walk_left: number
  walk_down: number

  idle_up: number
  idle_right: number
  idle_left: number
  idle_down: number
}

export const useMapTileRow = (
  schema: AnimationSchema,
  action: string,
  direction: Direction,
  defaultRow: number = 0
) => {
  // @ts-ignore
  return useMemo(() => schema[`${action}_${direction}`] ?? defaultRow, [action, direction])
}
