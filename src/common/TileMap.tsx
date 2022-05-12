import unflat from 'array-unflat'
import { useSetAtom } from 'jotai'
import { useEffect, useRef } from 'react'
import { collidableFamily } from '../atoms/collidable'
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
  const setColliable = useSetAtom(collidableFamily({ id: 'map' }))
  useEffect(() => {
    setColliable({
      x: padding[0] - 1,
      y: padding[1] + 1,
      width,
      height,
    })
  }, [])

  return (
    <group>
      {layers.map((layer, layerIndex) => {
        const data = unflat(layer.data, width)
        return (
          <group key={layerIndex}>
            {data.map((row, rowIndex) => (
              <group key={layerIndex + rowIndex}>
                {row.map((tileId, tileIndex) => (
                  <Tile
                    key={`${layerIndex + rowIndex + tileIndex}_${rowIndex}_${tileIndex}`}

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
              </group>
            ))}
          </group>
        )
      })}
    </group>
  )
}
