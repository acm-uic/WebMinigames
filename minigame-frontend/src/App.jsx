import "./App.css";
import NavBar from "./Nav-bar";
import { AdrianContributor } from "./contributors/Contributors";
import { Homepage } from "./page/Homepage";

function App() {
  return (
    <div>
      <NavBar />
      <Homepage />
      <div className="contributors m-10 p-3 gap-4 flex flex-wrap justify-center border border-solid border-gray-950">
        <h1 className="text-3xl">Contributors</h1>
        <h4>Add your contributor card below!</h4>
        <AdrianContributor />
      </div>
    </div>
  );
}

export default App;
