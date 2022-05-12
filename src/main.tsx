import { lazy } from 'react'
import { ThemeProvider } from '@mui/material'
import { createRoot } from 'react-dom/client'
import { theme } from './theme'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

const CharacterCreationPage = lazy(() => import('./routes/CharacterCreationPage'))
const GamePage = lazy(() => import('./routes/GamePage'))
const MapSelectionPage = lazy(() => import('./routes/MapSelectionPage'))

const root = createRoot(document.getElementById('root')!)

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path='/' element={<CharacterCreationPage />} />
          <Route path='/select-map' element={<MapSelectionPage />} />
          <Route path='/game' element={<GamePage />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  )
}

root.render(<App />)
