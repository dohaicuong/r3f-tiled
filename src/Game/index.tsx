import { Suspense, useMemo, useState } from 'react'

import { TileMap } from '../common/TileMap'
import mapData from './map.json'
import Menu from './Menu'
import Player from './Player'
import Girl from './GirlNpc'
import Anvil from './Anvil'
import { useAtom, useAtomValue } from 'jotai'
import { authAtom } from '../atoms/auth'

const Game = () => {
  const [start, setStart] = useState(false)
  
  const auth = useAtomValue(authAtom)
  const playerName = useMemo(() => `${auth.data.first_name} ${auth.data.last_name}`, [auth.data.first_name, auth.data.last_name])
  // const character = useMemo(() => {
  //   return (characterMap as any)[auth.data.data.cinque.avatar]
  // }, [auth.data.data.cinque.avatar])

  return (
    <Suspense fallback={null}>
      <Menu
        isStart={start}
        onClose={() => setStart(true)}
      />
      <TileMap
        padding={[-14, -11]}
        tileset='tileset.png'
        data={mapData}
      />
      {start && (
        <>
          <Player atom_id='player' name={playerName} position={[2, 1, 0]} />
          <Girl atom_id='girl' position={[-2, 4.5, 0]} />
          <Anvil atom_id='anvil' position={[8, 2, 0]} />
        </>
      )}
    </Suspense>
  )
}

export default Game

const characterMap = {
  1: 'swashbuckler',
  2: 'fox',
  3: 'sorcerer',
  4: 'beastmaster',
}