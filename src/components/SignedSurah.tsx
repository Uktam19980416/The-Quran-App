import React, {useState} from 'react';
import { useParams } from 'react-router-dom';
import { useMyContext } from '../contexts/MyContext';
import Loader from './Loader';
import TranslationText from './TranslationText';

const SignedSurah: React.FC = () => {
  const { surah } = useParams<{ surah: string }>()
  const { data, loading } = useMyContext()
  const surahData = data.find((item) => item.englishName === surah)
  const [isTranslationText, setIsTranslationText] = useState<boolean>(true)
  const [isReadingText, setIsReadingText] = useState<boolean>(false)
  const active = 'px-2 py-1 bg-slate-100 rounded-full'

  const handleTranslationText = () => {
    setIsTranslationText(true)
    setIsReadingText(false)
  }

  const handleReadingText = () => {
    setIsReadingText(true)
    setIsTranslationText(false)
  }

  return (
    <div className="container w-[1440px] max-w-4/5 mx-auto">
      <div className="flex justify-between items-center py-5">
        <button className="btn btn-success text-white">&#8592; Previous</button>
        <p className="text-3xl">{surahData?.englishName}</p>
        <div className="text-center">
          <p className="text-lg">Surah {surahData?.number}</p>
          <p className="text-lg">Verses {surahData?.ayahs.length}</p>
        </div>
        <p className="text-3xl">{surahData?.name}</p>
        <button className="btn btn-success text-white">Next &#8594;</button>
      </div>

      <div>
        <label className="input input-bordered flex items-center gap-2">
          <input type="text" className="grow" placeholder="Search in chapter" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
      </div>

      <div className="flex items-center justify-center my-5 gap-10 py-2 px-10 bg-slate-400 w-fit mx-auto rounded-md">
        <p
          onClick={handleTranslationText}
          className={`${isTranslationText ? active : ''} cursor-pointer`}
        >
          Translation
        </p>
        <p
          onClick={handleReadingText}
          className={`${isReadingText ? active : ''} cursor-pointer`}
        >
          Reading
        </p>
      </div>

      {isTranslationText && <TranslationText />}

      {isReadingText &&
        (loading ? (
          <Loader />
        ) : (
          <div className="my-10">
            {surahData?.ayahs.map((item) => {
              return (
                <div key={item.number}>
                  <p className="text-right text-slate-700 text-6xl">
                    {item.numberInSurah}. {item.text}
                  </p>
                  <hr className="border-t-4 my-3" />
                </div>
              )
            })}
          </div>
        ))}
    </div>
  )
}

export default SignedSurah;
