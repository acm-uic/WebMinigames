import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AdrianProfileImg from './Arrow Swarm trails.png'
import { AdrianContributor } from './AdrianContributor'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className='contributor-adrian'>
        <img src={AdrianProfileImg} width={"100px"}/>
        <div>
          Adrian Knight
          @Ajknight121
        </div>
      </div>
      <AdrianContributor name={"John"}/>
      {/* <AdrianContributor />
      <AdrianContributor />
      <AdrianContributor />
      <AdrianContributor /> */}
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
