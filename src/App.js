import './App.css';
import useAcuantSDK from './acuant-handling/useAcuantSDK';
import { useState, useEffect} from 'react';
import { useCookies } from 'react-cookie';
import useCamera from './acuant-handling/useCamera';

const handleCameraActivateClick = ({removeCookie, setCameraShouldBeOn}) => {
  removeCookie("AcuantCameraHasFailed")
  setCameraShouldBeOn(true)
}
function App() {
  // Deal with the cookie that Acuant sets on failure
  const [cookie, , removeCookie] = useCookies();
  useEffect(() => {
    if (cookie.AcuantCameraHasFailed) {
      removeCookie("AcuantCameraHasFailed")
      setCameraShouldBeOn(false); 
    }
  }, [cookie, removeCookie])

  // Internal state for this demo app
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const [cameraShouldBeOn, setCameraShouldBeOn] = useState(true);
  console.log(cameraShouldBeOn)

  // Load the SDK files
  useAcuantSDK(setSdkLoaded)
  // Check that the camera ui is in fact loaded
  const acuantCameraUIAvailable = !!window.AcuantCameraUI
  // Start the camera
  useCamera({sdkLoaded, acuantCameraUIAvailable, cameraShouldBeOn, setCameraShouldBeOn})
  
  return (
    <div className="App">
      <header className="App-header">
        <div id="acuant-camera" style={{height: "200px", width: "250px", background: "gray"}} />
        <button onClick={() => {handleCameraActivateClick({removeCookie, setCameraShouldBeOn})}} >Start Camera</button>
        <p>
          This is the AcuantSDK Running in React.
        </p>
      </header>
    </div>
  );
}

export default App;
