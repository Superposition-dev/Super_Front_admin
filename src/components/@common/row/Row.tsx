import cn from '../../../lib/tailwindUtil'

export interface RowType {
  title: string
  type?: React.HTMLInputTypeAttribute
  otherType?: string
  height?: string
  required?: boolean
  placeholder?: string
}

export interface RowProps {
  children?: React.ReactNode
}

const Row = ({ children }: RowProps) => {
  return (
    <div className="flex w-full gap-8">
      {children}
      {/* {item.type !== undefined && (
              <input
                required={item.required ? true : false}
                type={item.type}
                className="w-full p-3 border border-main-too-dark border-opacity-20 rounded"
                placeholder={item.placeholder}
              />
            )}
            {item.otherType === 'textarea' && (
              <textarea
                className={cn(
                  'w-full p-3 border border-main-too-dark border-opacity-20 rounded',
                  item.height && item.height,
                )}
                required={item.required ? true : false}
                placeholder={item.placeholder}
              />
            )} */}
    </div>
  )
}

export default Row
