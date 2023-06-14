import React, { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'
import getCroppedImg from './cropImage'
import {Button, Input, Label} from 'reactstrap'



const ImageCropper = (props) => {

  const {imageToCrop,croppedImage, setCroppedImage,setImageFile} = props

  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        imageToCrop,
        croppedAreaPixels,
        rotation,
        setImageFile
      )
      console.log('donee', { croppedImage })
      setCroppedImage(croppedImage)
    } catch (e) {
      console.error(e)
    }
  }, [croppedAreaPixels, rotation])

  const onClose = useCallback(() => {
    setCroppedImage(null)
  }, [])

  return (
    <div className='h-100 w-100'>
      <div className='position-relative w-100' style={{height:'400px'}}>
        <Cropper
          image={imageToCrop}
          crop={crop}
          rotation={rotation}
          zoom={zoom}
          aspect={2 / 3}
          onCropChange={setCrop}
          onRotationChange={setRotation}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
      <div>
        <div>
          <Label>Zoom</Label>
          <Input
            min={1}
            max={6}
            step={1}
            type="range"
            onChange={(e) => setZoom(e.target.value)}
          />
        </div>
        <div>
            <Label>Rotation</Label>
            <Input
                min={0}
                max={360}
                step={2}
                type="range"
                onChange={(e) => setRotation(e.target.value)}
            />
        </div>
        <Button
          onClick={showCroppedImage}
          color="primary"
        >
          Crop
        </Button>
      </div>
    </div>
  )
}
export default ImageCropper
