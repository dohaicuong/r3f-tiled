import { SpriteProps } from "@react-three/fiber"
import { AnimatedSprite } from "./components/AnimatedSprite"

type SorcProps = SpriteProps & {
  currentTextureRow: number
}

const Sorc: React.FC<SorcProps> = ({ currentTextureRow, ...props }) => {
  return (
    <AnimatedSprite
      spriteProps={props}
      geometryProps={{
        args: [3, 3, 1]
      }}
      currentTextureRow={currentTextureRow}
      textureAtlas={{
        tileset: 'sorc.png',
        tileSize: [48, 48],
        columns: 4,
      }}
    />
  )
}

export default Sorc
