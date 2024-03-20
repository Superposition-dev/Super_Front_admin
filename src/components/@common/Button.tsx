import { ButtonHTMLAttributes } from 'react'
import cn from '../../lib/tailwindUtil'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  name?: string
  children?: React.ReactNode
  addClass?: string
}

const Button = ({ name, children, addClass, ...props }: ButtonProps) => {
  return (
    <button className={cn('py-2 px-5 rounded-lg text-white bg-main-medium', addClass)} {...props}>
      {name && name}
      {children && children}
    </button>
  )
}

export default Button
