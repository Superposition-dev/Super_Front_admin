import cn from '../../../lib/tailwindUtil'
import Button, { type } from '../atom/Button'

export interface ButtonType {
  title: string
  onClick: () => void
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title: string
  constant?: boolean
  button?: ButtonType
}

const Input = ({ title, button, constant, ...props }: InputProps) => {
  return (
    <div className="flex flex-col gap-2.5 w-full">
      <h4 className="font-semibold">
        {title}
        {props.required && <span className="text-main-bright">*</span>}
      </h4>
      <div
        className={cn(
          'flex items-center justify-between w-full border border-main-too-dark border-opacity-20 rounded overflow-hidden',
          button && 'pr-1.5',
          !props.disabled ? '' : '',
        )}
      >
        <input
          className={cn('p-2.5', button ? 'w-3/4' : 'w-full', !constant && 'disabled:bg-transparent')}
          {...props}
        />
        {button && (
          <Button name={button.title} customType={type.fill} onClick={button.onClick} addClass="py-1.5 px-4" />
        )}
      </div>
    </div>
  )
}

export default Input
