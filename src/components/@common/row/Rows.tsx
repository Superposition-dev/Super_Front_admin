import cn from '../../../lib/tailwindUtil'

export interface RowsProps {
  children: React.ReactNode
  title: string
  width?: string
  addClass?: string
}

const Rows = ({ children, title, width, addClass }: RowsProps) => {
  return (
    <div
      className={cn(
        'flex flex-col gap-5 w-[60%] h-full p-4 rounded-2xl bg-white shadow-light border border-transparent',
        width,
        addClass,
      )}
    >
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="w-full border-t border-default border-opacity-5" />
      {children}
    </div>
  )
}

export default Rows
