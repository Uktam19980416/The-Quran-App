import React, { useState } from 'react'
import { useMyContext } from '../contexts/MyContext'

const Theme: React.FC = () => {
  const [isLight, setIsLight] = useState<boolean>(true)
  const [isDark, setIsDark] = useState<boolean>(false)
  const { theme, toggleTheme } = useMyContext()
  const activeTheme = `px-20 py-1 ${
    theme === 'dark' ? 'bg-slate-900' : 'bg-slate-400'
  } rounded-md text-lg`
  
  const handleLightTheme = () => {
    setIsLight(true)
    setIsDark(false)
    if (theme === 'light') return
    toggleTheme('light')
  }

  const handleDarkTheme = () => {
    setIsDark(true)
    setIsLight(false)
    if (theme === 'dark') return
    toggleTheme('dark')
  }
  return (
    <div>
      <p className="text-2xl">Theme</p>
      <div
        className={`${
          theme === 'dark' ? '' : 'bg-slate-400'
        }  flex items-center justify-evenly my-5 gap-10 py-2 px-10 w-full mx-auto rounded-md`}
        data-theme={theme === 'dark' ? 'dracula' : ''}
      >
        <p
          onClick={handleLightTheme}
          className={`${isLight ? activeTheme : 'cursor-pointer'}`}
          
        >
          Light
        </p>
        <p
          onClick={handleDarkTheme}
          className={`${isDark ? activeTheme : 'cursor-pointer'}`}
        >
          Dark
        </p>
      </div>
    </div>
  )
}

export default Theme