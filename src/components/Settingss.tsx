import React from 'react';
import Audios from './Audios';
import TranslationTab from './TranslationTab';

interface SettingsProps {
  toggleClose: () => void
}

const Settingss: React.FC<SettingsProps> = ({ toggleClose }) => {
  return (
    <div className="">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl">Settings</h2>
        <div className="w-fit cursor-pointer" onClick={toggleClose}>
          ✖️
        </div>
      </div>

      <hr className="my-3 border-t-2" />

      <div>
        <p className="text-2xl">Theme</p>
        <div className="flex items-center justify-evenly my-5 gap-10 py-2 px-10 bg-slate-400 w-full mx-auto rounded-md">
          <p className="px-20 py-1 bg-slate-100 rounded-md text-lg">Light</p>
          <p>Dark</p>
        </div>
      </div>

      <hr className="my-5 border-t-2" />
      <TranslationTab />
      <hr className="my-5 border-t-2" />
      <Audios />
    </div>
  )
}

export default Settingss;
