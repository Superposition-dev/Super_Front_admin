import React from 'react'
import { BiSolidMessageSquareEdit } from 'react-icons/bi'
import previewImage from '../../../utils/previewImage'

type ImageInputProps = {
  setImage: React.Dispatch<React.SetStateAction<File | null>>
  setPreviewImg: React.Dispatch<React.SetStateAction<string | null>>
}

const ImageInput = ({setImage,setPreviewImg}:ImageInputProps) => {
  return (
    <div className='absolute top-1.5 right-1.5'>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        id='file'
        onChange={(e) => {
          previewImage(e, setPreviewImg, setImage)
        }}
      />
      <label htmlFor='file'>
        <BiSolidMessageSquareEdit className="w-12 h-12 text-main-medium"/>
      </label>
    </div>
  )
}

export default ImageInput