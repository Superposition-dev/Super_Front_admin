import cn from '../../../lib/tailwindUtil'
import Label from '../Label'

export interface TInteractionProps {
  addClass?: string
  search?: {
    name: string
    value: number
  }
  total?: {
    name: string
    value: number
  }
  date?: {
    name: string
    value: string
  }
}

const TInteraction = ({ search, total, date, addClass, ...props }: TInteractionProps) => {
  return (
    <div className={cn('flex items-center gap-1 w-full', addClass)}>
      {search && (
        <>
          <Label name={search.name} addClass="text-sm" />
          <Label name={`${search.value}건`} addClass="bg-transparent font-bold" />
        </>
      )}
      {total && (
        <>
          <Label name={total.name} addClass="text-sm" />
          <Label name={`${total.value}건`} addClass="bg-transparent font-bold" />
        </>
      )}
      {date && (
        <>
          <Label name={date.name} addClass="text-sm" />
          <Label name={`${date.value}`} addClass="bg-transparent font-bold" />
        </>
      )}
    </div>
  )
}

export default TInteraction
