'use client'
import NavLinks from '@/components/sidebar/NavLinks'
import { MdMenu } from "react-icons/md";
import { useMediaQuery } from 'react-responsive';
import { useEffect, useState } from 'react';
import Modal from '@/components/sidebar/Modal';
import { links } from '@/components/sidebar/sidebarLinks'

const Sidebar = () => {
  const [showModal, setShowModal] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const isMobile = useMediaQuery({maxWidth: 767})
  const isTablet = useMediaQuery({minWidth: 768})
  
  useEffect(() => {
    setIsClient(true)
  },[])
  
  if(!isClient){
    return <div className='hidden'></div>
  }

  const SideNavContent:React.FC = () => (
    <div className='flex flex-col h-full mt-0 md:mt-16 md:pb-4 md:pt-10 md:bg-black'>
      <NavLinks links={links} onLinkClick={() => setShowModal(false)}/>
    </div>
  )

  return (
    <>
      {isMobile && (
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <SideNavContent />
        </Modal>
      )}

      <div className={`flex flex-col text-white h-screen ${isMobile? 'fixed z-20' : 'md:static'} md:bg-black md:w-1/6 md:overflow-y-auto lg:w-1/5`}>
        {isMobile && (
          <div 
            onClick={() => setShowModal(true)} 
            className='flex flex-col justify-center items-end rounded-md '
          >
            {!showModal && (
              <button className='p-4 text-black text-2xl hover:text-white bg-gray-300 bg-opacity-60 hover:bg-opacity-90 hover:bg-black z-10'>
                <MdMenu />
              </button>
            )}
          </div>
        )}

        {isTablet && <SideNavContent />}
      </div>
    </>
  )
}

export default Sidebar
