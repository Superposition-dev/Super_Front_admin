import cn from '../../../lib/tailwindUtil'

export interface ToggleProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  active: boolean
  addClass?: string
  toggleRef?: any
}

const Toggle = ({ active, addClass, toggleRef, ...props }: ToggleProps) => {
  return (
    <label
      className={cn(
        'relative inline-block cursor-pointer w-full h-full rounded-full align-middle',
        active ? ' bg-main-medium' : 'bg-gray-300',
        addClass,
      )}
      ref={toggleRef}
      {...props}
    >
      <span
        className={cn(
          'absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white rounded-full transition-all duration-500',
          active ? 'left-[60%]' : 'left-[10%]',
        )}
      />
    </label>
  )
}

export default Toggle
