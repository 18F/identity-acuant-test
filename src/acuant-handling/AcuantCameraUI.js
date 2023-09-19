import { useEffect } from "react"

const AcuantCameraUI = ({sdkLoaded, acuantCameraUIAvailable}) => {
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
    }, [sdkLoaded, acuantCameraUIAvailable])

    return (
        <div id="acuant-camera" style={{height: "200px", width: "250px", background: "blue"}} />
    )
}
export default AcuantCameraUI;