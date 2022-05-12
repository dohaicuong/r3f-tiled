import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import CharacterCreationPage from './routes/CharacterCreationPage'
import GamePage from './routes/GamePage'
import MapSelectionPage from './routes/MapSelectionPage'

const root = createRoot(document.getElementById('root')!)

const App = () => {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<CharacterCreationPage />} />
        <Route path='/select-map' element={<MapSelectionPage />} />
        <Route path='/game' element={<GamePage />} />
      </Routes>
    </BrowserRouter>
  )
}

root.render(
  <App />
);
