import Home from './components/Home'
import { Routes, Route } from 'react-router-dom'
import { MyContextProvider, useMyContext } from './contexts/MyContext'
import SignedSurah from './components/SignedSurah'
import Header from './components/Header'
import { SignedContextProvider } from './contexts/SignedContext'
import Footer from './components/Footer'

function App() {
  return (
    <MyContextProvider>
      <AppContent />
    </MyContextProvider>
  )
}

function AppContent() {
  const { theme } = useMyContext()
  return (
    <div data-theme={theme}>
      <SignedContextProvider>
        <div className="container w-[1440px] max-w-4/5 mx-auto">
          <Header />
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/surah/:surah" element={<SignedSurah />} />
        </Routes>
        <Footer />
      </SignedContextProvider>
    </div>
  )
}

export default App
