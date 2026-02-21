

import './App.css'
import HomePage from './pages/HomePage'
import { AudioProvider } from './providers/AudioContextProvider'
function App() {


  return (
    <AudioProvider>
      <HomePage />
    </AudioProvider>
  )
}

export default App
