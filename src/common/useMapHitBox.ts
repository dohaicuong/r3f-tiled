import { useAtomValue } from 'jotai'
import { useMemo } from 'react'
import { Box2, Vector2 } from 'three'
import { collidableFamily } from '../atoms/collidable'

export const useMapHitBox = () => {
  const collidable = useAtomValue(collidableFamily({ id: 'map' }))
  return useMemo(() => {
    const { x, y, width, height } = collidable

    return new Box2().setFromPoints([
      new Vector2(x, y + height),
      new Vector2(x + width, y + height),
      new Vector2(x, y),
      new Vector2(x + width, y),
    ])
  }, [collidable.x, collidable.y, collidable.width, collidable.height])
}
