export interface ButtonProps {
  name: string
  handler: () => void | undefined
}

const Button = (props: ButtonProps) => {
  const { name, handler } = props
  return (
    <button className="py-2 px-5 rounded-lg text-white bg-main-medium" onClick={handler}>
      {name}
    </button>
  )
}

export default Button
