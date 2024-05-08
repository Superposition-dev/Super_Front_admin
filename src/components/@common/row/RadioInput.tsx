import cn from '../../../lib/tailwindUtil'
import Button, { type } from '../atom/Button'

export interface ButtonType {
  title: string
  onClick: () => void
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title: string
  values: {
    value: string
    text: string
  }[]
  constant?: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
}

const RadioInput = ({ title, values, constant, onChange, disabled, ...props }: InputProps) => {
  return (
    <div className="flex flex-col gap-2.5 w-full h-full">
      <h4 className="font-semibold">
        {title}
        {props.required && <span className="text-main-bright">*</span>}
      </h4>
      <div className={cn('h-[80%] flex items-center w-full border-main-too-dark overflow-hidden', !disabled ? '' : '')}>
        {values.map((data, index) => (
          <label className="flex w-full " key={index}>
            <input
              className={cn('w-[30%]', !constant && 'disabled:bg-transparent')}
              type="radio"
              name={title}
              value={data.value}
              checked={props.value === data.value}
              onChange={onChange}
              disabled={disabled}
            />
            <span>{data.text}</span>
          </label>
        ))}
      </div>
    </div>
  )
}

export default RadioInput
