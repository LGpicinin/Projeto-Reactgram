// router
import { NavLink, Link } from "react-router-dom"
// icons
import {BsSearch, BsHouseDoorFill, BsFillPersonFill, BsFillCameraFill} from 'react-icons/bs'
// styles
import './NavBar.css'

const NavBar = () => {
  return (
        <nav id="nav">
            <Link to='/'>Reactgram</Link>
            <form>
                <BsSearch />
                <input type="text" />
            </form>
            <ul id="nav-links">
                <li>
                    <NavLink to='/'><BsHouseDoorFill/></NavLink>
                </li>
                <li>
                    <NavLink to='/login'>Login</NavLink>
                </li>
                <li>
                    <NavLink to='/register'>Cadastro</NavLink>
                </li>
            </ul>
        </nav>
  )
}

export default NavBar