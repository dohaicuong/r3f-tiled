import { useMemo } from 'react'
import { PlayerDirection } from './usePlayerInput'

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

  interact_up: number
  interact_right: number
  interact_left: number
  interact_down: number
}

export const useMapTileRow = (
  schema: AnimationSchema,
  action: string,
  direction: PlayerDirection,
  defaultRow: number = 0
) => {
  // @ts-ignore
  return useMemo(() => schema[`${action}_${direction}`] ?? defaultRow, [action, direction])
}
