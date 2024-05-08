import cn from '../../../lib/tailwindUtil'

export interface Tdprops extends React.HTMLAttributes<HTMLInputElement> {
  type?: 'checkbox'
  value?: any
  addClass?: string
  selectRef?: any
  children?: React.ReactNode
}

const Td = ({ type, value, selectRef, addClass, children, ...props }: Tdprops) => {
  return type === 'checkbox' ? (
    <td className="w-full block h-14">
      <label className="flex items-center justify-center w-full h-full" htmlFor={String(value)}>
        <input type={type} id={String(value)} ref={selectRef} {...props} />
      </label>
    </td>
  ) : (
    <td className={cn('px-2', addClass)}>{children ? children : value}</td>
  )
}

export default Td
