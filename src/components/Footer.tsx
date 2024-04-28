import React from 'react'
import { Link } from 'react-router-dom'
import { useMyContext } from '../contexts/MyContext'

const Footer: React.FC = () => {
  const now = new Date()
  const { search } = useMyContext()
  const condition = (typeof search === "string" && search.length > 3) || +search > 0
  return (
    <footer
      className={`text-center py-10 bg-slate-300 mt-5 ${
        (condition ? 'absolute bottom-0 w-full' : ''
        )}`}
    >
      <p className="text-2xl">
        Created by{' '}
        <Link
          to="https://github.com/Uktam19980416/The-Quran-App"
          target="_blank"
          className="underline"
        >
          Uktamjon {now.getFullYear()} {'  '}
          <i className="fa-brands fa-github"></i>
        </Link>
      </p>
    </footer>
  )
}

export default Footer
