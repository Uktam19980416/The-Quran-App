import React, { createContext, useState, useEffect } from 'react'

interface Format {
  identifier: string
  englishName: string
  language: string
}

interface MyContextType {
  isLoading: boolean
  translationData: Format[]
  translatedText: string
  setTranslationData: (data: Format[]) => void
  setTranslatedText: (text: string) => void
  audioFormats: Format[]
  selectedAudioFormat: string
  setSelectedAudioFormat: (format: string) => void
}

interface MyContextProviderProps {
  children: React.ReactNode
}

const SignedContext = createContext<MyContextType | undefined>(undefined)

const SignedContextProvider: React.FC<MyContextProviderProps> = ({
  children,
}) => {
  const [isLoading, setLoading] = useState<boolean>(false)
  // Translation
  const [translationData, setTranslationData] = useState<Format[]>([])
  const [translatedText, setTranslatedText] = useState<string>('')
  // Audio
  const [audioFormats, setAudioFormats] = useState<Format[]>([])
  const [selectedAudioFormat, setSelectedAudioFormat] = useState<string>('')

  useEffect(() => {
    async function fetchTranslatorData() {
      try {
        setLoading(true)
        const response = await fetch(
          // 'https://api.alquran.cloud/v1/edition/type/translation'
          'https://api.alquran.cloud/v1/edition/format/text'
        )
        const data = await response.json()
        setTranslationData(data.data)
        setTranslatedText(data.data[70]?.identifier || '')
        setLoading(false)
      } catch (error) {
        console.error('Error fetching translator data:', error)
        setLoading(false)
      }
    }

    fetchTranslatorData()
  }, [])

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          'https://api.alquran.cloud/v1/edition/format/audio'
        )
        const data = await response.json()
        setAudioFormats(data.data)
        setSelectedAudioFormat(data.data[0]?.identifier || '')
      } catch (error) {
        console.error('Error:', error)
      }
    }
    fetchData()
  }, [])

  const value: MyContextType = {
    isLoading,
    translationData,
    translatedText,
    setTranslationData,
    setTranslatedText,
    audioFormats,
    selectedAudioFormat,
    setSelectedAudioFormat,
  }

  return (
    <SignedContext.Provider value={value}>{children}</SignedContext.Provider>
  )
}

const useSignedContext = (): MyContextType => {
  const context = React.useContext(SignedContext)
  if (context === undefined) {
    throw new Error(
      'useSignedContext must be used within a SignedContextProvider'
    )
  }
  return context
}

export { SignedContextProvider, useSignedContext }