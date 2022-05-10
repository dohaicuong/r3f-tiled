import { Suspense, useEffect, useState } from 'react'

import { TileMap } from './common/TileMap'
import mapData from './map.json'
import Menu from './components/Menu'
import Sorc from './components/Sorc'



const App = () => {
  return (
    <Suspense fallback={null}>
      <Menu />
      <TileMap
        padding={[-14, -11]}
        tileset='tileset.png'
        data={mapData}
      />
      <Sorc
        position={[2, 1, 0]}
        scale={1}
      />
    </Suspense>
  )
}

export default App
