import React, {useState, useEffect, useRef, useCallback} from 'react';
import leftLogo from '../images/logo-left.png';
import midLogo from '../images/logo-mid.png'
import { Link } from 'react-router-dom';
import Settingss from './Settingss';
import { useMyContext } from '../contexts/MyContext';

const Header: React.FC = () => {
  const [show, setShow] = useState<boolean>(false)
  const modalRef = useRef<HTMLDivElement>(null)
  const { theme } = useMyContext()
  
  const handleShow = useCallback(() => {
    setShow((prev) => !prev)
  }, [])
  // Close the modal when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setShow(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [handleShow])

  return (
    <div className="flex justify-between items-center py-5" data-theme={theme}>
      <Link
        className="w-[100px] cursor-pointer flex items-center font-semibold"
        to="/"
      >
        <img src={leftLogo} alt="Left Logo" />
        <h2 className="text-2xl">Holy Quran</h2>
      </Link>
      <Link className="w-[50px] cursor-pointer" to="/">
        <img src={midLogo} alt="Mid Logo" />
      </Link>
      <div className="cursor-pointer">
        <i className="fa-solid fa-gear text-[25px]" onClick={handleShow}></i>
      </div>
      <div
        ref={modalRef}
        className={`fixed top-0 right-0 ${theme === 'dark' ? '' : "bg-white"} shadow-lg p-5 w-2/5 h-full z-10 rounded-md transition-transform ${
          show
            ? 'opacity-100 translate-x-0 pointer-events-auto'
            : 'opacity-0 translate-x-full pointer-events-none'
          }`}
        data-theme={theme}
      >
        {show && <Settingss toggleClose={handleShow} />}
      </div>
    </div>
  )
}

export default Header;
