export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title: string
}

const Input = ({ title, ...props }: InputProps) => {
  return (
    <div className="flex flex-col gap-2.5 w-full">
      <h4 className="font-semibold">
        {title}
        {props.required && <span className="text-main-bright">*</span>}
      </h4>
      <input className="w-full p-3 border border-main-too-dark border-opacity-20 rounded" {...props} />
    </div>
  )
}

export default Input
