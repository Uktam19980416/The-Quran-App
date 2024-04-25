import React from 'react'
import { useSignedContext } from '../contexts/SignedContext'

const TranslationTab: React.FC = () => {
  const { translationData, setTranslatedText, translatedText } =
    useSignedContext()

  return (
    <div className="flex items-center justify-between">
      <p>Translation</p>
      {translationData.length > 0 && (
        <select
          className="select select-bordered w-full max-w-xs"
          value={translatedText}
          onChange={(e) => setTranslatedText(e.target.value)}
        >
          {translationData.map((format) => (
            <option key={format.identifier} value={format.identifier}>
              {format.englishName} ({format.language})
            </option>
          ))}
        </select>
      )}
    </div>
  )
}

export default TranslationTab
