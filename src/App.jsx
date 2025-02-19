import './App.css'
import Main_Menu from './pages/Main_Menu'
import Game from './pages/Game_Screen'
import { Routes, Route } from 'react-router-dom'

function App() {

  return (
    
    <Routes>
    <Route path="Project_Nexus/" element={<Main_Menu />} />
    <Route path="Project_Nexus/game" element={<Game />} />
  </Routes>
  )
}

export default App
