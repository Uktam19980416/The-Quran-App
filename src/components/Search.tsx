import React from 'react';
import { useMyContext } from '../contexts/MyContext';

const Search: React.FC = () => {
  const { search, setSearch } = useMyContext()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Search:', search)
  }
  return (
    <div className="bg-green-200 py-10">
      <div className="container w-[1440px] max-w-4/5 mx-auto">
        <form className="flex items-center mb-8" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search for a surah..."
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-blue-500"

            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn btn-primary btn-normal" type="submit">
            Search
          </button>
        </form>

        <p className="text-gray-500 text-lg">
          Search by chapter name, common ayah names (e.g. kursi), verse key
          (e.g. 2:255) or Qur'anic word (Arabic/English) or Transliteration.
        </p>
      </div>
    </div>
  )
}

export default Search;
