const previewImage = (
  e: React.ChangeEvent<HTMLInputElement>,
  setImagePreview: React.Dispatch<React.SetStateAction<string | null>>,
  setImage: React.Dispatch<React.SetStateAction<File | null>>,
) => {
  if (e.target.files === null) return

  const file = e.target.files[0]
  setImage(file)
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onloadend = () => {
    setImagePreview(reader.result as string)
  }
}

export default previewImage
