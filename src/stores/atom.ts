import { atom } from 'recoil'
import { TBodyType } from '../components/@common/table/Table'

export const selectTableListAtom = atom<TBodyType[]>({
  key: 'selectedTableList',
  default: [],
})
