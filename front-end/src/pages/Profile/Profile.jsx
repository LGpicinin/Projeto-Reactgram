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
import { createPhoto, getUserPhotos, deletePhoto, resetMessage } from '../../slices/photoSlice'

const Profile = () => {

  // user details
  const { id } = useParams()
  const [name, setName] = useState("")
  const [bio, setBio] = useState("")

  // newPhoto details
  const [title, setTitle] = useState("")
  const [image, setImage] = useState("")

  // refs
  const newPhoto = useRef()
  const updatePhoto = useRef()

  // redux
  const {user, loading, error} = useSelector((state) => state.user)
  const {user: authUser} = useSelector((state) => state.auth)
  const {photos, loading: photoLoading, error: photoError, message: photoMessage} = useSelector((state) => state.photo)
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()

    const photo = {
      title,
      image,
    }

    const formData = new FormData()

    const photoFormData = Object.keys(photo).forEach((key) => {
      formData.append(key, photo[key])
    })

    formData.append('photo', photoFormData)

    dispatch(createPhoto(formData))

    setTimeout(() => {
      dispatch(resetMessage())
    }, 2000)

    setTitle("")
  }

  const handleDelete = (photoId, e) => {
    e.preventDefault()

    dispatch(deletePhoto(photoId))

    setTimeout(() => {
      dispatch(resetMessage())
    }, 2000)
  }

  const handleImage = (e) => {
    const image = e.target.files[0]

    setImage(image)
}

  useEffect(() => {
    if (id){
      dispatch(getUserById(id))
      dispatch(getUserPhotos(id))
    }
  }, [id])

  useEffect(() => {
    if(user){
        setName(user.name)
        setBio(user.bio)
    }
  }, [user])


  return (
    <div className='profile'>
      {loading && <p>Carregando</p>}
      {!loading && (
        <div className='profile-header'>
          {user && (user.profileImage) && (
            <img className='profile-image' src={`${uploads}\\users\\${user.profileImage}`} alt="Imagem de perfil" />
          )}
          <div className='profile-description'>
            <h2>{name}</h2>
            <p>{bio}</p>
          </div>
        </div>
      )}
      {id == authUser._id && (
        <div className='new-photo' ref={newPhoto}>
          <h3>Publique uma foto e compartilhe sua visão com o mundo</h3>
          <form onSubmit={handleSubmit}>
            <label>
              <span>Título</span>
              <input type="text" placeholder='Insira um título' value={title} onChange={(e) => setTitle(e.target.value)}/>
            </label>
            <label>
              <span>Foto</span>
              <input type='file' onChange={handleImage}/>
            </label>
            {!photoLoading && <input type="submit" value='Postar'/>}
            {photoLoading && <input type="submit" disabled value='Aguarde...'/>}
          </form>
          {photoError && <Message type="error" message={photoError}/>}
          {photoMessage && <Message type="success" message={photoMessage}/>}
        </div>
      )}
      <div className="user-photos">
        <h3>Fotos publicadas:</h3>
        {photos && (
          <div className="photos-container">
            {photos.map((photo) => (
                <div key={photo._id} className='photo'>
                  {photo.image && <img src={`${uploads}\\photos\\${photo.image}`} alt={photo.title} />}
                  {id === user._id ? (
                    <div className='actions'>
                      <Link to={`/photos/${photo._id}`}><BsFillEyeFill/></Link>
                      <BsPencilFill/>
                      <BsXLg onClick={(e) => handleDelete(photo._id, e)}/>
                    </div>
                    ) : (<Link className='btn' to={`/photos/${photo._id}`}>Ver foto</Link>)}
                </div>
            ))}
          </div>
        )}
        {photos.lenght === 0 && <p>Ainda não há fotos publicadas</p>}
      </div>
      {error && <p>{error}</p>}
    </div>
  )
}

export default Profile