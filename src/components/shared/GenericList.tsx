import { ReactElement } from 'react'
import Spin from "./Spin"

type GenericListProps = {
  list: unknown[] | null;
  loadingUI?: ReactElement;
  emptyListUI?: ReactElement;
  children: ReactElement;
}

const GenericList = ({list, loadingUI, emptyListUI, children}: GenericListProps) => {
  if (!list) {
    if (loadingUI) {
      return loadingUI
    }
    return <Spin />
  } else if (list.length === 0) {
    if (emptyListUI) {
      return emptyListUI
    }
    return <div>There are no elements to display</div>
  }
  return (
    children
  )
}

export default GenericList