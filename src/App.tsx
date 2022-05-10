import { Suspense, useEffect, useState } from 'react'

import { TileMap } from './common/TileMap'
import mapData from './map.json'
import Menu from './components/Menu'
import Sorc from './components/Sorc'
import Girl from './components/GirlNpc'

const App = () => {
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

export default App
