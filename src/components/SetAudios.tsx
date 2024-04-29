import React, { useEffect, useRef, useState } from 'react'
// import ReactAudioPlayer from 'react-audio-player'
import { useSignedContext } from '../contexts/SignedContext'
import { useParams } from 'react-router'

interface SurahProps {
  name: string
  englishName: string
  englishNameTranslation: string
  number: number
  ayahs: {
    number: number
    text: string
    numberInSurah: number
    audio: string
  }[]
}
interface SetAudiosProps {
  ayahNumber: number
}

const SetAudios: React.FC<SetAudiosProps> = ({ ayahNumber }) => {
  const { surah } = useParams<{ surah: string }>()
  const { selectedAudioFormat } = useSignedContext()
  const [data, setData] = useState<SurahProps[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const activeAudioRef = useRef<HTMLAudioElement | null>(null)
  const BASE_URL = 'https://api.alquran.cloud/v1/quran/'

  useEffect(() => {
    async function fetchScholarData() {
      try {
        setLoading(true)
        if (selectedAudioFormat) {
          const response = await fetch(
            `${BASE_URL}/${selectedAudioFormat}`
          ).then((response) => response.json())
          setData(response.data.surahs)
        }
        setLoading(false)
      } catch (error) {
        console.error('Error fetching scholar data:', error)
        setLoading(false)
      }
    }
    fetchScholarData()
  }, [selectedAudioFormat])

  const handleAudioPlay = (audioElement: HTMLAudioElement) => {
    // document.addEventListener(
    //   'play',
    //   function (e) {
    //     const audiosArr = [...document.getElementsByTagName('audio')]
    //     audiosArr.forEach((audio) => {
    //       if (audio !== e.target) {
    //         audio.pause()
    //       }
    //     })
    //   },
    //   true
    // )
    const audiosArr = Array.from(document.getElementsByTagName('audio')) as HTMLAudioElement[];
    audiosArr.forEach((audio) => {
      if (audio !== audioElement && !audio.paused) {
        audio.pause();
      }
    })
    activeAudioRef.current = audioElement
  }

  const handleAudioEnd = (ayahNumber: number) => {
    const nextAyahNumber = ayahNumber + 1
    const nextAudioElement = document.getElementById(
      `audio-${nextAyahNumber}`
    ) as HTMLAudioElement

    if (nextAudioElement) {
      nextAudioElement.play()
      nextAudioElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }


  const filteredData = data.find((surahData) => surahData.englishName === surah)

  if (loading) {
    return (
      <p>
        <span className="loading loading-spinner loading-md"></span>
      </p>
    )
  }

  if (!selectedAudioFormat) {
    return <p>No translated text available</p>
  }
  return (
    <div className="w-full my-5">
      {filteredData?.ayahs.map((ayah) => {
        if(ayah.number === ayahNumber){
          return (
            <audio
              key={ayah.number}
              id={`audio-${ayah.number}`}
              className="w-full"
              controls
              onPlay={() => handleAudioPlay(activeAudioRef.current || document.getElementById(`audio-${ayah.number}`) as HTMLAudioElement)}
              onEnded={() => handleAudioEnd(ayah.number)}
            >
              <source src={ayah.audio} />
            </audio>
          )
        }
      })}
    </div>
  )
}

export default SetAudios