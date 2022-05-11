import { Box2, Sprite, Vector2 } from 'three'
import { useFrame } from '@react-three/fiber'
import { useHitBox } from '../common/useHitBox'
import { useMapHitBox } from '../common/useMapHitBox'
import { PlayerAction } from '../common/usePlayerInput'
import { useAtom } from 'jotai'
import { collidableFamily } from '../families/collidable'

export const useWhenPlayerWalk = (
  id: string,
  ref: React.MutableRefObject<Sprite>,
  action: PlayerAction,
  acceleration: [number, number]
) => {
  const [playerPos, setPlayerPos] = useAtom(collidableFamily({ id }))
  
  const girlHitBox = useHitBox('girl')
  const anvilHitBox = useHitBox('anvil')

  const mapHitBox = useMapHitBox()

  useFrame((_, delta) => {
    if (action === 'walk') {
      const newPos = [
        ref.current.position.x + acceleration[0] * delta,
        ref.current.position.y + acceleration[1] * delta
      ]

      const playerHitBox = new Box2(
        new Vector2(newPos[0] - playerPos.width, newPos[1]),
        new Vector2(newPos[0], newPos[1] + playerPos.height)
      )

      const willInMap = mapHitBox.containsBox(playerHitBox)
      const willCollidedWithGirl = playerHitBox.intersectsBox(girlHitBox)
      const willCollidedWithAnvil = playerHitBox.intersectsBox(anvilHitBox)

      const isMovable = [
        willInMap,
        !willCollidedWithGirl,
        !willCollidedWithAnvil,
      ].every(condition => condition === true)
      if (!isMovable) return

      ref.current.position.x = newPos[0]
      ref.current.position.y = newPos[1]
      setPlayerPos({
        x: newPos[0], y: newPos[1],
        width: 1, height: 1,
      })
    }
  })
}
