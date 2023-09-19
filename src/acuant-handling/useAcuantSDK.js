import { useEffect } from 'react';

// These are publicly available credentials used to initialize the client-side Acuant SDK, per
// the note in application.yml.default
const acuantSdkInitializationCreds= 'aWRzY2FuZ293ZWJAYWN1YW50Y29ycC5jb206NVZLcm81Z0JEc1hrdFh2NA==';
const acuantSdkInitializationEndpoint =  'https://us.acas.acuant.net';

const onLoadError = () => {
  console.error('error')
}

const onInitializeSuccess = () => {
  console.log('onInitializeSuccess')
}

const onInitializeFailure = (code, description) => {
  console.log('onInitializeFailure', code, description)
}

const initializeSDK = (credentials, endpoint) => {
  window.AcuantJavascriptWebSdk.initialize(credentials, endpoint, {
    onSuccess: onInitializeSuccess,
    onFail: onInitializeFailure,
  });
}

const useAcuantSDK = (setSdkLoaded) => {
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
      initializeSDK(acuantSdkInitializationCreds, acuantSdkInitializationEndpoint);
      setSdkLoaded(true);
    }

    const acuantDirectory = process.env.PUBLIC_URL + '/acuant/'
    window.acuantConfig = { path: acuantDirectory};

    const sdkScript = document.createElement('script');
    sdkScript.src = acuantDirectory + 'AcuantJavascriptWebSdk.min.js';
    sdkScript.onload = onAcuantSdkLoaded;
    sdkScript.onerror = onLoadError;
    document.body.appendChild(sdkScript);

    const cameraScript = document.createElement('script');
    cameraScript.async = true;
    cameraScript.src = acuantDirectory + 'AcuantCamera.min.js';
    cameraScript.onerror = onLoadError;
    document.body.appendChild(cameraScript);

    return () => {
      document.body.removeChild(sdkScript);
      document.body.removeChild(cameraScript);
    };
  }, [setSdkLoaded])
}

export default useAcuantSDK;