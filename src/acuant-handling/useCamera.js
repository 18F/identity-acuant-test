import { useEffect } from "react"

const useCamera = ({sdkLoaded, acuantCameraUIAvailable}) => {
    useEffect(() => {
        if (!sdkLoaded || !acuantCameraUIAvailable) {
            return;
        }
    const cameraCallback = {
        onCaptured: (response) => {
          console.log('onCaptured', response)
        },
        onCropped: (response) => {
          console.log('onCropped', response)
          if (response) {} //use response
          else {} //cropping error, restart capture
        },
        onFrameAvailable: (response) => {},
        onError: (error, code) => {
            console.log('error', error, code)
        }
      }

      window.AcuantCameraUI.start(cameraCallback)

      return () => {
        window.AcuantCameraUI.stop();
      }
    }, [sdkLoaded, acuantCameraUIAvailable])
}
export default useCamera;