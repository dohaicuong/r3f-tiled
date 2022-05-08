import unflat from 'array-unflat'
import { Tile } from './Tile'

type TileMapProps = {
  padding: [number, number]
  tileset: string
  data: TiledMapData
}

type TiledMapData = {
  width: number
  height: number

  tilewidth: number
  tileheight: number

  layers: {
    data: number[]
  }[]
}

export const TileMap: React.FC<TileMapProps> = ({
  padding,
  tileset,
  data: {
    width,
    height,
    tilewidth,
    tileheight,
    layers,
  }
}) => {
  return (
    <>
      {layers.map(layer => {
        const data = unflat(layer.data, width)
        return (
          <>
            {data.map((row, rowIndex) => (
              <>
                {row.map((tileId, tileIndex) => (
                  <Tile
                    key={`${rowIndex}_${tileIndex}`}

                    source={tileset}
                    tileWidth={tilewidth}
                    tileHeight={tileheight}

                    position={[
                      tileIndex + padding[0],
                      height - rowIndex + padding[1]
                    ]}
                    tileId={tileId}
                  />
                ))}
              </>
            ))}
          </>
        )
      })}
    </>
  )
}
