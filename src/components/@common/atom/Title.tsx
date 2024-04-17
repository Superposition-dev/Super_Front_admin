import React from 'react'
import cn from '../../../lib/tailwindUtil'

export interface TitleProps {
  addClass?: string
  value: string
  size: 'small' | 'medium' | 'large'
}

const Title = ({ addClass, value, size }: TitleProps) => {
  return (
    <h2
      className={cn(
        ' font-semibold',
        size === 'small' ? 'text-sm' : size === 'medium' ? 'text-base' : 'text-xl',
        addClass,
      )}
    >
      {value}
    </h2>
  )
}

export default React.memo(Title)
