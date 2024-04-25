import Home from "./components/Home"
import {Routes, Route} from "react-router-dom"
import { MyContextProvider } from "./contexts/MyContext"
import SignedSurah from "./components/SignedSurah"
import Header from "./components/Header"
import { SignedContextProvider } from "./contexts/SignedContext"

function App() {

  return (
    <div>
      <MyContextProvider>
        <SignedContextProvider>
          <div className="container w-[1440px] max-w-4/5 mx-auto">
            <Header />
          </div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/surah/:surah"
              element={<SignedSurah />}
            />
          </Routes>
        </SignedContextProvider>
      </MyContextProvider>
    </div>
  )
}

export default App
