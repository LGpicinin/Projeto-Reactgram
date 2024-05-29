// styles
import './Profile.css'
// config
import { uploads } from '../../utils/config'
// components
import Message from '../../components/Message/Message'
import { Link } from 'react-router-dom'
import { BsFillEyeFill, BsPencilFill, BsXLg } from 'react-icons/bs'
// hooks
import { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
// redux
import { getUserById } from '../../slices/userSlice'

const Profile = () => {

  const [name, setName] = useState("")
  const [bio, setBio] = useState("")
  const [profileImage, setProfileImage] = useState("")

  const { id } = useParams()
  const {user, loading, error} = useSelector((state) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    if (id)
      dispatch(getUserById(id))
  }, [id])

  useEffect(() => {
    if(user){
        setName(user.name)
        setBio(user.bio)

        console.log(user)
    }
  }, [user])

  return (
    <div id='profile'>
      {loading && <p>Carregando</p>}
      {!loading && (
        <div id='profile-header'>
          {user && (user.profileImage) && (
            <img className='profile-image' src={`${uploads}\\users\\${user.profileImage}`} alt="Imagem de perfil" />
          )}
          <div id='profile-description'>
            <h2>{name}</h2>
            <p>{bio}</p>
          </div>
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  )
}

export default Profile