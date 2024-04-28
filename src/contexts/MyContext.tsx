import React, { createContext, useContext, useEffect } from 'react';

interface SurahProps {
  name: string
  englishName: string
  englishNameTranslation: string
  number: number
  ayahs: {
    number: number
    text: string
    numberInSurah: number
  }[]
}

interface MyContextType {
  data: SurahProps[]
  loading: boolean
  search: string
  setSearch: (search: string) => void
}

interface MyContextProviderProps {
  children: React.ReactNode;
}

const MyContext = createContext<MyContextType | undefined>(undefined)

const MyContextProvider: React.FC<MyContextProviderProps> = ({children}) => {
  const [data, setData] = React.useState<SurahProps[]>([])
  const [search, setSearch] = React.useState<string>('')
  const [loading, setLoading] = React.useState<boolean>(false)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      await fetch('https://api.alquran.cloud/v1/quran')
        .then((response) => response.json())
        .then((data) => {
          setData(data.data.surahs)
          setLoading(false)
        }
      ).catch((error) => {
        console.error('Error:', error)
        setLoading(false)
      })
    }
    fetchData()
  }, [])
  
  const value: MyContextType = { data, loading, search, setSearch }
  return (
    <MyContext.Provider value={value}>
      {children}
    </MyContext.Provider>
  )
}

const useMyContext = (): MyContextType => {
  const context = useContext(MyContext)
  if (context === undefined) {
    throw new Error('useMyContext must be used within a MyContextProvider')
  }
  return context
}

export { MyContextProvider, useMyContext }
