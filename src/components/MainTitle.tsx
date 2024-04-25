import React from 'react';

const MainTitle: React.FC = () => {
  return (
    <div className="py-5">
      <div className="flex items-center justify-between">
        <h1 className="text-6xl">Surahs</h1>
        <p className="text-xl text-neutral-500">Select a chapter to get started!</p>
      </div>
      <hr className="border-t-4" />
    </div>
  );
}

export default MainTitle;
