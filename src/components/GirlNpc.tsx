import { SpriteProps } from '@react-three/fiber'
import { AnimatedSprite } from '../common/AnimatedSprite'

type GirlProps = SpriteProps

const Girl: React.FC<GirlProps> = props => {
  return (
    <AnimatedSprite
      spriteProps={{ ...props, scale: 1 }}
      geometryProps={{
        args: [1, 1.5, 1]
      }}
      currentTextureRow={3}
      textureAtlas={{
        tileset: 'npc_girl.png',
        tileSize: [16, 24],
        columns: 4,
      }}
    />
  )
}

export default Girl
