import { Route, Routes } from 'react-router-dom'
import './App.css'
import LogIn from './pages/LogIn'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import ProtectedRoute from './components/route/ProtectedRoute'

function App() {
  return (
    <>
      <Routes>
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<LogIn />} />

        <Route path='/home'
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
      </Routes>
    </>
  )
}

export default App
