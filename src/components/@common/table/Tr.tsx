import cn from '../../../lib/tailwindUtil'

export interface TrProps extends React.HTMLAttributes<HTMLTableRowElement> {
  children: React.ReactNode
  addClass?: string
}

const Tr = ({ children, addClass, ...props }: TrProps) => {
  return (
    <tr
      className={cn('w-full h-14 text-center border-b border-default border-opacity-5 cursor-pointer', addClass)}
      {...props}
    >
      {children}
    </tr>
  )
}

export default Tr
