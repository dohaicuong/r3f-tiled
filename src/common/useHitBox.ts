import { useAtomValue } from "jotai"
import { useMemo } from "react"
import { Box2, Vector2 } from "three"
import { collidableFamily } from "../families/collidable"

export const useHitBox = (id: string) => {
  const collidable = useAtomValue(collidableFamily({ id }))
  return useMemo(() => {
    return new Box2(
      new Vector2(collidable.x - collidable.width, collidable.y),
      new Vector2(collidable.x, collidable.y + collidable.height)
    )
  }, [collidable.x, collidable.y, collidable.width, collidable.height])
}
