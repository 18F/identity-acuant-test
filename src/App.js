import './App.css';
import useAcuantSDK from './acuant-handling/useAcuantSDK';
import { useState, useEffect} from 'react';
import { useCookies } from 'react-cookie';
import useCamera from './acuant-handling/useCamera';

function App() {
  // Deal with the cookie that Acuant sets on failure
  const [cookie, setCookie, removeCookie] = useCookies();
  useEffect(() => {
    //removeCookie("AcuantCameraHasFailed")
  })

  // Internal state for this demo app
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const [cameraShouldBeOn, setCameraShouldBeOn] = useState(false);

  // Load the SDK files
  useAcuantSDK(setSdkLoaded)
  // Check that the camera ui is in fact loaded
  const acuantCameraUIAvailable = !!window.AcuantCameraUI
  // Start the camera
  useCamera({sdkLoaded, acuantCameraUIAvailable, cameraShouldBeOn, setCameraShouldBeOn})
  
  return (
    <div className="App">
      <header className="App-header">
        <div id="acuant-camera" style={{height: "200px", width: "250px", background: "blue"}} />
        <button onClick={() => {}} >Start Camera</button>
        <p>
          This is the MVP of the AcuantSDK (09/19/2023)
        </p>
      </header>
    </div>
  );
}

export default App;
