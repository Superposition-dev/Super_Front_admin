export interface TrProps extends React.HTMLAttributes<HTMLTableRowElement> {
  children: React.ReactNode
}

const Tr = ({ children, ...props }: TrProps) => {
  return (
    <tr className="w-full h-14 text-center border-b border-default border-opacity-5 cursor-pointer" {...props}>
      {children}
    </tr>
  )
}

export default Tr
