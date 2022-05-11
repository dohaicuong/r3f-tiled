import { Suspense } from 'react'

import { TileMap } from '../common/TileMap'
import mapData from './map.json'
import Menu from './Menu'
import Sorc from './Sorc'
import Girl from './GirlNpc'

const Game = () => {
  return (
    <Suspense fallback={null}>
      <Menu />
      <TileMap
        padding={[-14, -11]}
        tileset='tileset.png'
        data={mapData}
      />
      <Sorc name='yuki' position={[2, 1, 0]} />
      <Girl position={[-2, 4.5, 0]} />
    </Suspense>
  )
}

export default Game
