import cn from '../../../lib/tailwindUtil'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  title: string
  height?: string
}

const Textarea = ({ title, height, ...props }: TextareaProps) => {
  return (
    <div className="flex flex-col gap-2.5 w-full">
      <h4 className="font-semibold">
        {title}
        {props.required && <span className="text-main-bright">*</span>}
      </h4>
      <textarea
        className={cn(
          'w-full h-[160px] p-3 border border-main-too-dark border-opacity-20 rounded disabled:bg-transparent',
          height,
        )}
        {...props}
      />
    </div>
  )
}

export default Textarea
