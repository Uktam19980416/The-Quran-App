import React, { useEffect, useState } from 'react'
import { useSignedContext } from '../contexts/SignedContext'
import SetAudios from './SetAudios'
import { useParams } from 'react-router'
import Loader from './Loader'
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

const TranslationText: React.FC = () => {
  const { surah } = useParams<{ surah: string }>()
  const { translatedText } = useSignedContext()
  const [data, setData] = useState<SurahProps[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  // const dataText = 'en.asad';
  const BASE_URL = 'https://api.alquran.cloud/v1/quran'

  useEffect(() => {
    async function fetchScholarData() {
      try {
        setLoading(true)
        if (translatedText) {
          const response = await fetch(`${BASE_URL}/${translatedText}`).then(
            (response) => response.json()
          )
          setData(response.data.surahs)
        }
        setLoading(false)
      } catch (error) {
        console.error('Error fetching scholar data:', error)
        setLoading(false)
      }
    }
    fetchScholarData()
  }, [translatedText])

  if (loading) {
    return <Loader />
  }

  if (!translatedText) {
    return <p className="text-3xl">No translated text available 🙅‍♂️</p>
  }
  const filteredData = data.find((surahData) => surahData.englishName === surah)
  console.log(filteredData)
  return (
    <>
      {filteredData?.ayahs.map((ayah, i) => (
        <div
          key={ayah.number}
          className="bg-white shadow-md rounded-lg overflow-hidden"
        >
          <div className="px-6 py-4 bg-gray-200">
            <div className="flex items-center gap-5">
              <div>
                <p>{i + 1}</p>
                <p>
                  <i className="fa-solid fa-heart"></i>
                </p>
                <p>
                  <i className="fa-solid fa-share"></i>
                </p>
                <p>
                  <i className="fa-solid fa-person-praying"></i>
                </p>
              </div>
              <div>
                <p className="text-2xl">{ayah.text}</p>
              </div>
            </div>
            <SetAudios ayahNumber={ayah.number} />

          </div>
          <hr className="border-t-4 my-10 border-emerald-700" />
        </div>
      ))}
    </>
  )
}

export default TranslationText
