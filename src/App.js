import './App.css';
import useAcuantSDK from './acuant-handling/useAcuantSDK';
import AcuantCameraUI from './acuant-handling/AcuantCameraUI';
import { useState } from 'react';

function App() {
  const [sdkLoaded, setSdkLoaded] = useState(false);
  useAcuantSDK(setSdkLoaded)
  const acuantCameraUIAvailable = !!window.AcuantCameraUI
  
  return (
    <div className="App">
      <header className="App-header">
        <AcuantCameraUI sdkLoaded={sdkLoaded} acuantCameraUIAvailable={acuantCameraUIAvailable}/>
        <p>
          This is the MVP of the AcuantSDK (09/19/2023)
        </p>
      </header>
    </div>
  );
}

export default App;
