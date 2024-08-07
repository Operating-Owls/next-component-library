type ModalProps = {
  isOpen: boolean;
  onClose: VoidFunction;
  children: React.ReactNode;
}

const Modal:React.FC<ModalProps>= ({ isOpen, onClose, children }) => {
  if(!isOpen) return null
  
  const handleClose:React.MouseEventHandler<HTMLDivElement> = (e) => {
    if(e.target instanceof HTMLElement && e.target.id ==="wrapper") {
      onClose()
    }
  }

  return (
    <div 
      id="wrapper" 
      onClick={handleClose} 
      className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-start items-start'
    >
      <div className='w-6/12 max-h-full h-full flex flex-col bg-white rounded-r-md animate-slideIn'>
        <button onClick={onClose} className='text-black bg-transparent p-2 text-2xl place-self-end'>X</button>
        <div className="bg-white p-2 rounded overflow-y-auto flex-grow">{children}</div>
      </div>
    </div>
  )
}

export default Modal
