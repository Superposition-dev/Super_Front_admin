import { ButtonHTMLAttributes } from 'react'
import cn from '../../lib/tailwindUtil'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  name?: string
  children?: React.ReactNode
  addClass?: string
  customType?: string
}

export enum type {
  fill = 'fill',
  empty = 'empty',
}

const Button = ({ name, children, addClass, customType, ...props }: ButtonProps) => {
  return (
    <button
      className={cn(
        'py-2 px-5 rounded-lg',
        customType === type.fill
          ? ' text-white bg-main-medium'
          : customType === type.empty
            ? 'text-default bg-transparent border border-default border-opacity-20 '
            : '',
        addClass,
      )}
      {...props}
    >
      {name && name}
      {children && children}
    </button>
  )
}

export default Button
