import React from 'react';
import Search from './Search';
import MainTitle from './MainTitle';
import Surah from './Surah';
import Loader from './Loader'
import { useMyContext } from '../contexts/MyContext';

const Home: React.FC = () => {
  const { loading } = useMyContext()

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Search />
          <div className="container w-[1440px] max-w-4/5 mx-auto">
            <MainTitle />
            <Surah />
          </div>
        </>
      )}
    </div>
  )
}

export default Home;
