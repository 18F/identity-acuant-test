import { useEffect } from "react"

const useCamera = ({sdkLoaded, acuantCameraUIAvailable, cameraShouldBeOn, setCameraShouldBeOn}) => {
    useEffect(() => {
        if (!sdkLoaded || !acuantCameraUIAvailable || !cameraShouldBeOn) {
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
    }, [sdkLoaded, acuantCameraUIAvailable, cameraShouldBeOn])
}
export default useCamera;