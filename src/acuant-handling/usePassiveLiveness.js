

export const faceDetectionStates = {
  FACE_NOT_FOUND: "FACE NOT FOUND",
  TOO_MANY_FACES: "TOO MANY FACES",
  FACE_ANGLE_TOO_LARGE: "FACE ANGLE TOO LARGE",
  PROBABILITY_TOO_SMALL: "PROBABILITY TOO SMALL",
  FACE_TOO_SMALL: "FACE TOO SMALL",
  FACE_CLOSE_TO_BORDER: "TOO CLOSE TO THE FRAME"
}


export const faceCaptureCallback = {
  onDetectorInitialized: () => {
    //This callback is triggered when the face detector is ready.
    //Until then, no actions are executed and the user sees only the camera stream.
    //You can opt to display an alert before the callback is triggered.
    console.log("onDetectorInitialized")
  },
  onDetection: (text) => {
    //Triggered when the face does not pass the scan. The UI element
    //should be updated here to provide guidence to the user
    console.log("onDetection", text)
  },
  onOpened: () => {
    //Camera has opened
    console.log("onOpened");
  },
  onClosed: () => {
    //Camera has closed
    console.log("onClosed");
  },
  onError: (error) => {
    //Error occurred. Camera permission not granted will
    //manifest here with 1 as error code. Unexpected errors will have 2 as error code.
    console.log("onError");
  },
  onPhotoTaken: () => {
    //The photo has been taken and it's showing a preview with a button to accept or retake the image.
    console.log("onPhotoTake");
  },
  onPhotoRetake: () => {
    //Triggered when retake button is tapped
    console.log("onPhotoRetake");
  },
  onCaptured: (base64Image) => {
    //Triggered when accept button is tapped
    console.log("onCaptured");
  }
}

export const startPassiveLiveness = () => {
  window.AcuantPassiveLiveness.start(faceCaptureCallback, faceDetectionStates);
}
