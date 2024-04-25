import React, { useState, useEffect } from 'react'

const Language: React.FC = () => {
  const [languageFormats, setLanguageFormats] = useState([])
  const [selectedLanguageFormat, setSelectedLanguageFormat] = useState<string>('')

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          'https://api.alquran.cloud/v1/edition/language'
        )
        const data = await response.json()
        setLanguageFormats(data.data)
        setSelectedLanguageFormat(data.data[0] || '')
      } catch (error) {
        console.error('Error:', error)
      }
    }
    fetchData()
  }, [])
  return (
    <div className="flex items-center justify-between">
      <p>Tooltip Language</p>
      <select
        className="select select-bordered w-full max-w-xs"
        value={selectedLanguageFormat}
        onChange={(e) => setSelectedLanguageFormat(e.target.value)}
      >
        {languageFormats.map((format, index) => (
          <option key={index} value={format}>
            {format}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Language
