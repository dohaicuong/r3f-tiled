import { useEffect, useRef, useState } from 'react'
import { useKeyPress, useKeyPressEvent } from 'react-use'

export type PlayerAction = 'idle' | 'walk' | 'attack' | 'interact'

export type PlayerDirection = 'up' | 'down' | 'left' | 'right'

export type PlayerInputSchema = {
  attack: string
  interact: string
  walk_up: string
  walk_down: string
  walk_right: string
  walk_left: string
}

export const usePlayerInput = (
  schema: PlayerInputSchema,
  moveSpeed = 5,
): [PlayerAction, PlayerDirection, [number, number]] => {
  const [moveUp] = useKeyPress(schema.walk_up)
  const [moveDown] = useKeyPress(schema.walk_down)
  const [moveLeft] = useKeyPress(schema.walk_left)
  const [moveRight] = useKeyPress(schema.walk_right)

  const [action, setAction] = useState<PlayerAction>('idle')
  useKeyPressEvent(
    ({ key }) => Object.values(schema).includes(key),
    ({ key }) => {
      const action = Object
        .entries(schema)
        .find(([_, schemaKey]) => schemaKey === key)
        ?.[0]
        .split('_')
        ?.[0]
        || undefined
      if (action) setAction(action as PlayerAction)
    },
    () => {
      if (moveUp || moveDown || moveRight || moveLeft) return

      setAction('idle')
    }
  )
  useEffect(() => {
    if (!moveUp && !moveDown && !moveLeft && !moveRight) setAction('idle')
  }, [moveUp, moveDown, moveLeft, moveRight])

  const directionRef = useRef<PlayerDirection>('down')
  useEffect(() => {
    if (moveUp) directionRef.current = 'up'
    else if (moveDown) directionRef.current = 'down'
    else if (moveRight) directionRef.current = 'right'
    else if (moveLeft) directionRef.current = 'left'
  }, [moveUp, moveDown, moveLeft, moveRight])

  const [acceleration, setAcceleration] = useState<[number, number]>([0, 0])
  useEffect(() => {
    const newAcceleration: [number, number] = [0, 0]
    if (moveRight) newAcceleration[0] += moveSpeed
    if (moveLeft) newAcceleration[0] -= moveSpeed
    if (moveUp) newAcceleration[1] += moveSpeed
    if (moveDown) newAcceleration[1] -= moveSpeed
    setAcceleration(newAcceleration)
  }, [moveUp, moveDown, moveLeft, moveRight])

  return [
    action,
    directionRef.current,
    acceleration
  ]
}
