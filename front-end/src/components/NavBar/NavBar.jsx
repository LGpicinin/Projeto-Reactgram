// router
import { NavLink, Link } from "react-router-dom"
// icons
import { BsSearch, BsHouseDoorFill, BsFillPersonFill, BsFillCameraFill } from 'react-icons/bs'
// styles
import './NavBar.css'
// hooks
import { useAuth } from "../../hooks/useAuth"
import { useSelector, useDispatch } from "react-redux"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
// redux
import { logout, reset } from "../../slices/authSlice"


const NavBar = () => {

    const {auth} = useAuth()
    const {user} = useSelector((state) => state.auth)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [search, setSearch] = useState("")

    const handleLogout = () => {
        dispatch(logout())
        dispatch(reset())

        navigate("/login")
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if(search)
            return navigate(`/search?q=${search}`)
    }

    return (
            <nav id="nav">
                <Link to='/'>Reactgram</Link>
                <form id="search-form" onSubmit={handleSubmit}>
                    <BsSearch />
                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}/>
                </form>
                <ul id="nav-links">
                    {auth && (
                        <>
                            <li>
                                <NavLink to='/'><BsHouseDoorFill/></NavLink>
                            </li>
                            {user && 
                                <li>
                                    <NavLink to={`/users/${user._id}`}><BsFillCameraFill/></NavLink>
                                </li>
                            }
                            <li>
                                <NavLink to='/profile'><BsFillPersonFill/></NavLink>
                            </li>
                            <li>
                                <span onClick={handleLogout}>Sair</span>
                            </li>
                        </>
                    )}
                    {!auth && (
                        <>
                            <li>
                                <NavLink to='/login'>Login</NavLink>
                            </li>
                            <li>
                                <NavLink to='/register'>Cadastro</NavLink>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
    )
}

export default NavBar