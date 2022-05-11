import { useEffect, useState } from 'react'
import { useHitBox } from './useHitBox'
import { PlayerAction } from './usePlayerInput'

export const usePlayerInteract = (playerId: string, interactToId: string, action: PlayerAction) => {
  const [isInteract, setIsInteract] = useState(false)
  
  const interactionBox = useHitBox(interactToId, [0.5, 0.5])

  const playerHitBox = useHitBox(playerId)

  useEffect(() => {
    const isInteractWithGirl = playerHitBox.intersectsBox(interactionBox)
    if (action === 'interact' && isInteractWithGirl) {
      setIsInteract(true)
    }
    if (!isInteractWithGirl) {
      setIsInteract(false)
    }
  }, [action])

  return [isInteract]
}
