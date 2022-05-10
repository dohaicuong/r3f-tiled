import { SpriteProps } from "@react-three/fiber"
import { AnimatedSprite } from "./components/AnimatedSprite"

type Action =
  | 'atk_up'
  | 'atk_right'
  | 'atk_left'
  | 'atk_down'
  | 'walk_up'
  | 'walk_right'
  | 'walk_left'
  | 'walk_down'
  | 'idle_up'
  | 'idle_right'
  | 'idle_left'
  | 'idle_down'

const actionRowMap = {
  atk_up: 0,
  atk_right: 1,
  atk_left: 2,
  atk_down: 3,
  walk_up: 4,
  walk_right: 5,
  walk_left: 6,
  walk_down: 7,
  idle_up: 8,
  idle_right: 9,
  idle_left: 10,
  idle_down: 11,
}

type SorcProps = SpriteProps & {
  action: Action
}

const Sorc: React.FC<SorcProps> = ({ action, ...props }) => {
  return (
    <AnimatedSprite
      spriteProps={props}
      geometryProps={{
        args: [3, 3, 1]
      }}
      currentTextureRow={actionRowMap[action]}
      textureAtlas={{
        tileset: 'sorc.png',
        tileSize: [48, 48],
        columns: 4,
      }}
    />
  )
}

export default Sorc
