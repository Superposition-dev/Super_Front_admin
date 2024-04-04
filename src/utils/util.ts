import defaultImage from '../assets/default.png'

export const customDefaultImg = (src: string | null) => {
  return src !== null ? src : defaultImage
}
