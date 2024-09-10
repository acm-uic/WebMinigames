import './App.css'
import { AdrianContributor } from './AdrianContributor'
function App() {

  return (
    <div>
      <h1 className='text-3xl'>Contributors</h1>
      <h4>Add your contributor card below!</h4>
      Default styling on HTML elements (h1,li) removed due to tailwindcss has been added
      <div className='contributors m-10 p-3 gap-4 flex flex-wrap justify-center border border-solid border-gray-950'>
        <AdrianContributor />
      </div>
    </div>
  )
}

export default App
