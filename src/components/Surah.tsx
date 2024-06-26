import React from 'react'
import { useMyContext } from '../contexts/MyContext'
import { Link } from 'react-router-dom'

const Surah: React.FC = () => {
  const { data, search, theme } = useMyContext()
  const searchedData = data.filter((ayahName) =>
    ayahName.englishName.toLowerCase().includes(search.toLowerCase())
    || ayahName.englishNameTranslation.toLowerCase().includes(search.toLowerCase())
    || ayahName.name.toLowerCase().includes(search.toLowerCase())
    || ayahName.number === +search
  )

  if (!searchedData.length) {
    return <p className="text-center mt-5">No results found 🙅‍♂️</p>
  }
  return (
    <div className="grid grid-cols-3 gap-5">
      {searchedData?.map((item) => {
        return (
          <Link
            to={`/surah/${item.englishName}`}
            key={item.name}
            className="border-4 border-dashed flex items-center justify-between py-5 px-5"
          >
            <div className="flex items-center gap-5">
              <div className="relative rotate rotate-45">
                <div
                  className={`${
                    theme === 'dark' ? '' : ' bg-gray-200'
                  } w-12 h-12 rounded-md`}
                  data-theme={theme === 'dark' ? 'dracula' : ''}
                >
                  <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate rotate-[315deg]">
                    {item.number}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-gray-500 text-lg font-bold">
                  {item.englishName}
                </p>
                <p className="text-gray-500">{item.englishNameTranslation}</p>
              </div>
            </div>
            <div>
              <p
                className={`${
                  theme === 'dark' ? '' : 'text-slate-700'
                } text-arabic text-lg font-bold`}
              >
                {item.name}
              </p>
              <p
                className={`${
                  theme === 'dark' ? '' : 'text-slate-700'
                } text-ayah-number`}
              >
                {item.ayahs.length} Ayahs
              </p>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export default Surah
