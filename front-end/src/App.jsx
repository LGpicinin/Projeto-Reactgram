// styles
import './App.css'
// router
import {BrowserRouter, Routes, Route} from "react-router-dom"
// components
import NavBar from './components/NavBar/NavBar'
import Footer from './components/Footer/Footer'
// pages
import Home from './pages/Home/Home'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'

function App() {

  return (
    <>
      <BrowserRouter>
      <div className="container">
        <NavBar/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
          </Routes>
        </div>
        <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
