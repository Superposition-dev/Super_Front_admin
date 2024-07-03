import reactDom from 'react-dom'

interface ModalPortalProps {
  children: React.ReactNode
}

export default function ModalPortal({ children }: ModalPortalProps) {
  const modalRoot = document.getElementById('modal-root') as HTMLElement
  return reactDom.createPortal(children, modalRoot)
}
