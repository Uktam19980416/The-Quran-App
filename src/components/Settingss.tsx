import React from 'react';
import Audios from './Audios';
import TranslationTab from './TranslationTab';
import Theme from './Theme';

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

      <Theme />

      <hr className="my-5 border-t-2" />
      <TranslationTab />
      <hr className="my-5 border-t-2" />
      <Audios />
    </div>
  )
}

export default Settingss;
