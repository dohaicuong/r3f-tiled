import { SpriteProps } from '@react-three/fiber'
import { AnimatedSprite } from '../common/AnimatedSprite'
import { Posture } from '../utils/hooks/usePosture'

type SorcProps = SpriteProps & {
  posture: Posture
}

const Sorc: React.FC<SorcProps> = ({ posture, ...props }) => {
  return (
    <AnimatedSprite
      spriteProps={props}
      geometryProps={{
        args: [3, 3, 1]
      }}
      currentTextureRow={posture}
      textureAtlas={{
        tileset: 'sorc.png',
        tileSize: [48, 48],
        columns: 4,
      }}
    />
  )
}

export default Sorc
