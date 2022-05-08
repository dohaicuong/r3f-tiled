import { TileMap } from './components/TileMap'
import mapData from './map.json'

const App = () => {
  return (
    <TileMap
      padding={[-14, -10.5]}
      tileset='tileset.png'
      data={mapData}
    />
  )
}

export default App
