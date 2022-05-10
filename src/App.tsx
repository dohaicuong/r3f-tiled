import { AnimatedSprite } from './components/AnimatedSprite'
import { TileMap } from './components/TileMap'
import mapData from './map.json'

const App = () => {
  return (
    <>
      <TileMap
        padding={[-14, -11]}
        tileset='tileset.png'
        data={mapData}
      />
      <AnimatedSprite
        spriteProps={{
          position: [2, 1, 0],
          scale: 1
        }}
        geometryProps={{
          args: [3, 3, 1]
        }}
        textureData={{
          tileset: 'sorc.png',
          tileSize: [48, 48],
          columns: 4,
          currentRow: 11,
        }}
      />
    </>
  )
}

export default App

