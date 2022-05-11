import { Suspense } from 'react'

import { TileMap } from '../common/TileMap'
import mapData from './map.json'
import Menu from './Menu'
import Player from './Player'
import Girl from './GirlNpc'
import Anvil from './Anvil'

const Game = () => {
  return (
    <Suspense fallback={null}>
      <Menu />
      <TileMap
        padding={[-14, -11]}
        tileset='tileset.png'
        data={mapData}
      />
      <Player atom_id='player' name='yuki' position={[2, 1, 0]} />
      <Girl atom_id='girl' position={[-2, 4.5, 0]} />
      <Anvil atom_id='anvil' position={[8, 2, 0]} />
    </Suspense>
  )
}

export default Game
