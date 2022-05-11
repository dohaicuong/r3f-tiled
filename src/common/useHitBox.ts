import { useAtomValue } from "jotai"
import { useMemo } from "react"
import { Box2, Vector2 } from "three"
import { collidableFamily } from "../families/collidable"

export const useHitBox = (id: string, padding: [number, number] = [0, 0]) => {
  const collidable = useAtomValue(collidableFamily({ id }))
  return useMemo(() => {
    return new Box2(
      new Vector2(collidable.x - collidable.width - padding[0], collidable.y - padding[1]),
      new Vector2(collidable.x + padding[0], collidable.y + collidable.height + padding[1])
    )
  }, [collidable.x, collidable.y, collidable.width, collidable.height])
}
