import { createContext, useContext } from 'react'
import { createMachine } from 'xstate'
import { useActor, useInterpret } from '@xstate/react'

export const QuestlineContext = createContext<{ questline?: any }>({})

export const questlineMachine = createMachine({
  id: 'questline',
  initial: 'new_quest',
  states: {
    new_quest: {
      on: { NEXT: 'ongoing_quest' },
    },
    ongoing_quest: {
      on: { NEXT: 'done_quest' },
    },
    done_quest: {},
  }
})

type QuestLineProviderProps = {
  children: React.ReactNode
}

export const QuestLineProvider: React.FC<QuestLineProviderProps> = ({ children }) => {
  const questline = useInterpret(questlineMachine)

  return (
    <QuestlineContext.Provider value={{ questline }}>
      {children}
    </QuestlineContext.Provider>
  )
}

export const useQuestlineStateMachine = () => {
  const questlineServices = useContext(QuestlineContext)

  return useActor(questlineServices.questline) as any
}
