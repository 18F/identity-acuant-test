import './App.css';
import useAcuantSDK from './acuant-handling/useAcuantSDK';
import AcuantCameraUI from './acuant-handling/useCamera';
import { useState, useEffect} from 'react';
import { useCookies } from 'react-cookie';
import useCamera from './acuant-handling/useCamera';



function App() {
  const [cookie, setCookie, removeCookie] = useCookies();
  useEffect(() => {
    removeCookie("AcuantCameraHasFailed")
  })
  const [sdkLoaded, setSdkLoaded] = useState(false);
  useAcuantSDK(setSdkLoaded)
  const acuantCameraUIAvailable = !!window.AcuantCameraUI
  useCamera({sdkLoaded, acuantCameraUIAvailable})
  
  return (
    <div className="App">
      <header className="App-header">
        <div id="acuant-camera" style={{height: "200px", width: "250px", background: "blue"}} />
        <p>
          This is the MVP of the AcuantSDK (09/19/2023)
        </p>
      </header>
    </div>
  );
}

export default App;
