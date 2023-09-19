import { useEffect } from 'react';

const useAcuantSDK = () => {
  useEffect(() => {
    // Acuant SDK expects this global to be assigned at the time the script is
    // loaded, which is why the script element is manually appended to the DOM.
    function onAcuantSdkLoaded() {
      const { loadAcuantSdk } = window;
      // Normally, Acuant SDK would call this itself, but because it does so as part of a
      // DOMContentLoaded event handler, it wouldn't be called if the page is already loaded.
      if (!window.AcuantJavascriptWebSdk) {
        if (typeof loadAcuantSdk !== 'function') {
          return;
        }
        loadAcuantSdk();
      }
    }
    function setIsError() {
      console.error('error')
    }

    const acuantDirectory = process.env.PUBLIC_URL + '/acuant/'
    window.acuantConfig = { path: acuantDirectory};

    const sdkScript = document.createElement('script');
    sdkScript.src = acuantDirectory + 'AcuantJavascriptWebSdk.min.js';
    sdkScript.onload = onAcuantSdkLoaded;
    sdkScript.onerror = () => setIsError(true);
    document.body.appendChild(sdkScript);

    const cameraScript = document.createElement('script');
    cameraScript.async = true;
    cameraScript.src = acuantDirectory + 'AcuantCamera.min.js';
    cameraScript.onerror = () => setIsError(true);
    document.body.appendChild(cameraScript);

    return () => {
      document.body.removeChild(sdkScript);
      document.body.removeChild(cameraScript);
    };
  }, [])
}

export default useAcuantSDK;