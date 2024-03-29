import { lazy, Suspense, useEffect } from 'react'
import { ThemeProvider } from '@mui/material'
import { createRoot } from 'react-dom/client'
import { theme } from './theme'

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAtom } from 'jotai'
import { authAtom } from './atoms/auth'

const CharacterCreationPage = lazy(() => import('./routes/CharacterCreationPage'))
const GamePage = lazy(() => import('./routes/GamePage'))
const MapSelectionPage = lazy(() => import('./routes/MapSelectionPage'))

const root = createRoot(document.getElementById('root')!)

const App = () => {
  


  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Suspense fallback='Loading page...'>
          <Routes>
            <Route path='/select-map'  element={<MapSelectionPage />} />
            <Route path='/game'  element={<GamePage />} />
            <Route path='*' element={<CharacterCreationPage />} />
          </Routes>
        </Suspense>
      </ThemeProvider>
    </BrowserRouter>
  )
}

root.render(<App />)
