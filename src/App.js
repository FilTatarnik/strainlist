// import Straincard from './Components/straincard';
import StrainGrid from './Components/straingrid';
// import strains from "./Data/strain_data.json";
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className='straingrid'>
          <StrainGrid />
        </div>
      </header>
    </div>
  );
}

export default App;
