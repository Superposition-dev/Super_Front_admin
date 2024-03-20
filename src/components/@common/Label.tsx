import cn from '../../lib/tailwindUtil'

export interface LabelProps {
  name?: string
  children?: React.ReactNode
  addClass?: string
}

const Label = ({ name, children, addClass, ...props }: LabelProps) => {
  return (
    <label className={cn('bg-gray-100 text-gray-600 px-3 py-1.5 rounded-md font-semibold', addClass)} {...props}>
      {name}
    </label>
  )
}

export default Label
