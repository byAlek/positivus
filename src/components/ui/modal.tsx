import {
  cloneElement,
  createContext,
  isValidElement,
  type ComponentChildren,
  type ComponentProps,
  type RefObject,
} from 'preact'
import { useContext, useEffect, useRef } from 'preact/hooks'

import { lockScroll, unlockScroll } from '@/lib/scroll-lock'
import { cn } from '@/lib/utils'
import { Button } from './button'

type ModalContext = {
  openModal: () => void
  closeModal: () => void
  dialogRef: RefObject<HTMLDialogElement>
}

const ModalContext = createContext<ModalContext | null>(null)

const useModalContext = () => {
  const context = useContext(ModalContext)
  if (!context) throw new Error('useModalContext must be used within a Modal')
  return context
}

const Modal = ({
  children,
  open,
  onOpenChange,
}: {
  children: ComponentChildren
  open?: boolean
  onOpenChange?: (open: boolean) => void
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null)

  function onOpen() {
    lockScroll()
    dialogRef.current?.showModal()
    onOpenChange?.(true)
  }
  function onClose() {
    unlockScroll()
    dialogRef.current?.close()
    onOpenChange?.(false)
  }

  useEffect(() => {
    open && open ? onOpen() : onClose()
  }, [open])

  return (
    <ModalContext.Provider value={{ openModal: onOpen, closeModal: onClose, dialogRef }}>
      {children}
    </ModalContext.Provider>
  )
}

Modal.Content = ({
  children,
  className = '',
  closeButton = true,
}: {
  children: ComponentChildren
  className?: string
  closeButton?: boolean
}) => {
  const { closeModal, dialogRef } = useModalContext()

  useEffect(() => {
    const dialog = dialogRef.current

    function onCancel(e: Event) {
      e.preventDefault()
      closeModal()
    }

    dialog?.addEventListener('cancel', onCancel)
    return () => dialog?.removeEventListener('cancel', onCancel)
  }, [])

  return (
    <dialog
      ref={dialogRef}
      onClick={closeModal}
      className={cn(
        'backdrop:bg-background/50 group fill-mode-forwards backdrop:fill-mode-forwards pointer-events-auto size-full h-dvh max-h-none max-w-none content-center overflow-hidden bg-transparent transition-discrete duration-300 outline-none backdrop:backdrop-blur-2xl backdrop:transition-discrete backdrop:duration-300',
        'animate-out fade-out-0 open:animate-in open:fade-in-0',
        'backdrop:animate-out backdrop:fade-out-0 open:backdrop:fade-in-0 open:backdrop:animate-in'
      )}
    >
      {closeButton && (
        <Button
          onClick={(e) => {
            e.stopPropagation()
            closeModal()
          }}
          className="fixed top-4 right-4 z-10"
          variant="ghost"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </Button>
      )}
      <div
        onClick={(e) => {
          e.stopPropagation()
        }}
        className={cn(
          'fill-mode-forwards mx-auto w-fit transition-discrete duration-300',
          'animate-out blur-out-md zoom-out-95 group-open:animate-in group-open:blur-in-md group-open:zoom-in-95',
          className
        )}
      >
        {children}
      </div>
    </dialog>
  )
}

Modal.Trigger = ({ asChild, ...props }: ComponentProps<typeof Button> & { asChild?: boolean }) => {
  const { openModal } = useModalContext()

  const passProps = (el: ComponentChildren) => {
    if (isValidElement(el)) {
      return cloneElement(el, { onClick: openModal })
    }
    throw new Error(
      'Modal.Trigger with asChild requires a valid React element as child. Ensure you are passing a proper JSX element.'
    )
  }

  return asChild ? passProps(props.children) : <Button {...props} onClick={openModal} />
}

export { Modal }
