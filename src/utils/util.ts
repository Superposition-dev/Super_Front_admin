import defaultImage from '../assets/default.png'

// export const customDefaultImg = (src: string) => {
//   return src !== null && src !== '' ? src : defaultImage
// }

export const customDefaultImg = (src: string) => {
  if (src?.includes('base64')) return src
  return src !== null && src !== '' ? `https://kr.object.ncloudstorage.com/superposition-bucket/${src}` : defaultImage
}

export const dateFormat = (date: Date) => {
  return date.toISOString().split('T')[0]
}
