import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CreateEstadistics from './components/CreateEstadistics'
import WebReport from './components/WebReport'

function App() {
  const [count, setCount] = useState(0)
  

  return (
      <div>     
          <CreateEstadistics/>
      
      </div>
  )
}

export default App
