import React from 'react'
import { BiSolidMessageSquareEdit } from 'react-icons/bi'
import previewImage from '../../../utils/previewImage'

type ImageInputProps = {
  setFile: React.Dispatch<React.SetStateAction<File | null>>
  setPreviewImg: React.Dispatch<React.SetStateAction<string | null>>
  imageRef: React.RefObject<HTMLInputElement>
}

const ImageInput = ({ setFile, setPreviewImg, imageRef }: ImageInputProps) => {
  return (
    <div className="absolute top-1.5 right-1.5">
      <input
        type="file"
        accept="image/*"
        className="hidden"
        id="file"
        ref={imageRef}
        onChange={(e) => {
          previewImage(e, setPreviewImg, setFile)
        }}
      />
      <BiSolidMessageSquareEdit className="w-12 h-12 text-main-medium" />
    </div>
  )
}

export default ImageInput
