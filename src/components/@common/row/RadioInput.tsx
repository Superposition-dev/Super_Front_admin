import cn from '../../../lib/tailwindUtil'

export interface ButtonType {
  title: string
  onClick: () => void
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title: string
  values: string[]
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
              value={data}
              checked={props.value === data}
              onChange={onChange}
              disabled={disabled}
            />
            <span>{data === 'prev' ? '전시 예정' : data === 'current' ? '전시중' : 'end' ? '전시 종료' : ''}</span>
          </label>
        ))}
      </div>
    </div>
  )
}

export default RadioInput
