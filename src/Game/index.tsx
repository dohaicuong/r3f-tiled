import { Suspense, useMemo, useState } from 'react'

import { TileMap } from '../common/TileMap'
import mapData from './map.json'
import Menu from './Menu'
import Player from './Player'
import Girl from './GirlNpc'
import Anvil from './Anvil'
import { useAtomValue } from 'jotai'
import { authAtom } from '../atoms/auth'
import { QuestLineProvider, useQuestlineStateMachine } from './questline'
import tileset from '../../assets/tileset.png'
import { Html } from '@react-three/drei'

const characterMap = {
  1: 'swashbuckler',
  2: 'fox',
  3: 'sorcerer',
  4: 'beastmaster',
}

const Game = () => {
  const [start, setStart] = useState(false)

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
      <QuestLineProvider>
        {start && <GameObjects />}
      </QuestLineProvider>
      <Html style={{ display: 'none' }}>
        <img src={tileset} />
      </Html>
    </Suspense>
  )
}

export default Game

const GameObjects = () => {
  const auth = useAtomValue(authAtom)
  const playerName = useMemo(() => `${auth.data.first_name} ${auth.data.last_name}`, [auth.data.first_name, auth.data.last_name])

  // const character = useMemo(() => {
  //   return (characterMap as any)[auth.data.data.cinque.avatar]
  // }, [auth.data.data.cinque.avatar])

  const [questlineState] = useQuestlineStateMachine()

  return (
    <>
      <Player atom_id='player' name={playerName} position={[2, 1, 0]} />
      <Girl
        atom_id='girl'
        position={[-2, 4.5, 0]}
        hasQuest={questlineState.value === 'new_quest'}
      />
      {questlineState.value === 'ongoing_quest' && (
        <Anvil atom_id='anvil' position={[8, 2, 0]} />
      )}
    </>
  )
}
