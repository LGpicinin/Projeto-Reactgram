// styles
import './App.css'
// router
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
// components
import NavBar from './components/NavBar/NavBar'
import Footer from './components/Footer/Footer'
// pages
import Home from './pages/Home/Home'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
// hooks
import { useAuth } from './hooks/useAuth'

function App() {

  const {auth, loading} = useAuth()

  return (
    <>
      {loading && <p>Carregando...</p>}
      {!loading && (
        <BrowserRouter>
          <div className="container">
            <NavBar/>
            <Routes>

                <Route path='/' element={auth ? <Home/> : <Navigate to='/login'/>}/>
                <Route path='/login' element={!auth ? <Login/> : <Navigate to='/'/>}/>
                <Route path='/register' element={!auth ? <Register/> : <Navigate to='/'/>}/>

            </Routes>
          </div>
          <Footer/>
        </BrowserRouter>
      )}
    </>
  )
}

export default App