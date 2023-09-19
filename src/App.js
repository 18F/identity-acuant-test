import logo from './logo.svg';
import './App.css';
import useAcuantSDK from './acuant-handling/useAcuantSDK';
import AcuantCameraUI from './acuant-handling/AcuantCameraUI';

function App() {
  useAcuantSDK()
  
  return (
    <div className="App">
      <header className="App-header">
        <AcuantCameraUI />
        <p>
          This is the MVP of the AcuantSDK (09/19/2023)
        </p>
      </header>
    </div>
  );
}

export default App;
