import React from 'react'
import { useSignedContext } from '../contexts/SignedContext'

const Audios: React.FC = () => {  
  const { audioFormats, selectedAudioFormat, setSelectedAudioFormat } = useSignedContext()
  return (
    <div className="flex items-center justify-between">
      <p>Reciter(Audio)</p>
      <select className="select select-bordered w-full max-w-xs"
        value={selectedAudioFormat}
        onChange={(e) => setSelectedAudioFormat(e.target.value)}
      >
        {audioFormats.map((format) => (
          <option key={format.identifier} value={format.identifier}>
            {format.englishName} ({format.language})
          </option>
        ))}
      </select>
    </div>
  )
}

export default Audios
