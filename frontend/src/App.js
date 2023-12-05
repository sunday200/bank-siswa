import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Header from './components/Header'
import SiswaScreen from './screens/SiswaScreen'
import KelasScreen from './screens/KelasScreen'
import SettingSiswaScreen from './screens/SettingSiswaScreen'

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <main>
          <Routes>
            <Route path='/' element={<SiswaScreen />} />
            <Route path='/amountData/:amountData' element={<SiswaScreen />} />
            <Route path='/page/:pageNumber' element={<SiswaScreen />} />
            <Route
              path='/amountData/:amountData/page/:pageNumber'
              element={<SiswaScreen />}
            />
            <Route path='/search/:keyword' element={<SiswaScreen />} />

            <Route
              path='/search/:keyword/page/:pageNumber'
              element={<SiswaScreen />}
            />
            <Route
              path='/search/:keyword/amountData/:amountData'
              element={<SiswaScreen />}
            />

            <Route
              path='/search/:keyword/amountData/:amountData/page/:pageNumber'
              element={<SiswaScreen />}
            />
            <Route path='/kelas' element={<KelasScreen />} />

            <Route
              path='/kelas/amountData/:amountData'
              element={<KelasScreen />}
            />
            <Route path='/kelas/page/:pageNumber' element={<KelasScreen />} />
            <Route
              path='/kelas/amountData/:amountData/page/:pageNumber'
              element={<KelasScreen />}
            />
            <Route path='/kelas/search/:keyword' element={<KelasScreen />} />

            <Route
              path='/kelas/search/:keyword/page/:pageNumber'
              element={<KelasScreen />}
            />
            <Route
              path='/kelas/search/:keyword/amountData/:amountData'
              element={<KelasScreen />}
            />

            <Route
              path='/kelas/search/:keyword/amountData/:amountData/page/:pageNumber'
              element={<KelasScreen />}
            />

            <Route path='/setting-siswa' element={<SettingSiswaScreen />} />

            <Route
              path='/setting-siswa/amountData/:amountData'
              element={<SettingSiswaScreen />}
            />
            <Route
              path='/setting-siswa/page/:pageNumber'
              element={<SettingSiswaScreen />}
            />
            <Route
              path='/setting-siswa/amountData/:amountData/page/:pageNumber'
              element={<SettingSiswaScreen />}
            />
            <Route
              path='/setting-siswa/search/:keyword'
              element={<SettingSiswaScreen />}
            />

            <Route
              path='/setting-siswa/search/:keyword/page/:pageNumber'
              element={<SettingSiswaScreen />}
            />
            <Route
              path='/setting-siswa/search/:keyword/amountData/:amountData'
              element={<SettingSiswaScreen />}
            />

            <Route
              path='/setting-siswa/search/:keyword/amountData/:amountData/page/:pageNumber'
              element={<SettingSiswaScreen />}
            />

            <Route
              path='/setting-siswa/:keywordClass'
              element={<SettingSiswaScreen />}
            />
          </Routes>
        </main>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
