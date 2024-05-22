import defaultImage from '../assets/default.png'

export const customDefaultImg = (src: string) => {
  return src !== null && src !== '' ? src : defaultImage
}

export const dateFormat = (date: Date) => {
  return date.toISOString().split('T')[0]
}
