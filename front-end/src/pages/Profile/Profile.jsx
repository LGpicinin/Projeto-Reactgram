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
import { useResetMessage } from '../../hooks/useResetMessage'
// redux
import { getUserById } from '../../slices/userSlice'
import { createPhoto, getUserPhotos, deletePhoto, editPhoto } from '../../slices/photoSlice'

const Profile = () => {

  // user details
  const { id } = useParams()
  const [name, setName] = useState("")
  const [bio, setBio] = useState("")

  // newPhoto details
  const [title, setTitle] = useState("")
  const [image, setImage] = useState("")

  // updatePhoto details
  const [updateID, setUpdateID] = useState("")
  const [updateTitle, setUpdateTitle] = useState("")
  const [updateImage, setUpdateImage] = useState("")

  // refs
  const newPhoto = useRef()
  const updatePhoto = useRef()

  // redux
  const {user, loading, error} = useSelector((state) => state.user)
  const {user: authUser} = useSelector((state) => state.auth)
  const {photos, loading: photoLoading, error: photoError, message: photoMessage} = useSelector((state) => state.photo)
  const dispatch = useDispatch()
  const resetMessage = useResetMessage(dispatch, "photo")


  // create photo
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

    resetMessage()

    setTitle("")
  }


  // delete photo
  const handleDelete = (photoId, e) => {
    e.preventDefault()

    dispatch(deletePhoto(photoId))

    resetMessage()
  }

  const handleImage = (e) => {
    const image = e.target.files[0]

    setImage(image)
  }

  // hide or show forms
  const hideOrShowForms = () => {
    newPhoto.current.classList.toggle("hide")
    updatePhoto.current.classList.toggle("hide")
  }


  // update photo
  const handleUpdate = (e) => {
    e.preventDefault()

    const photoData = {
      title: updateTitle,
      id: updateID,
    }

    dispatch(editPhoto(photoData))

    resetMessage()

  }

  const handleCancelUpdate = () => {
    hideOrShowForms()

    setUpdateTitle("")
    setUpdateID("")
    setUpdateImage("")
  }

  const openUpdateForm = (photo) => {
    if(updatePhoto.current.classList.contains("hide")){
      hideOrShowForms()
    }

    setUpdateTitle(photo.title)
    setUpdateID(photo._id)
    setUpdateImage(photo.image)
  }


  // useEffects
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
        <>
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
          </div>
          <div className="edit-photo hide" ref={updatePhoto}>
            <h3>Editar foto:</h3>
            {updateImage && (
              <img src={`${uploads}\\photos\\${updateImage}`} alt={updateTitle} />
            )}
            <form onSubmit={(e) => handleUpdate(e)}>
              <input type="text" value={updateTitle} onChange={(e) => setUpdateTitle(e.target.value)}/>
              {!photoLoading && <input type="submit" value='Atualizar'/>}
              {photoLoading && <input type="submit" disabled value='Aguarde...'/>}
            </form>
            <button className='cancel-btn' onClick={() => handleCancelUpdate()}>Cancelar edição</button>
          </div>
          {photoError && <Message type="error" message={photoError}/>}
          {photoMessage && <Message type="success" message={photoMessage}/>}
        </>
      )}
      <div className="user-photos">
        <h3>Fotos publicadas:</h3>
        {photos && (
          <div className="photos-container">
            {photos.length > 0 && photos.map((photo) => (
                <div key={photo._id} className='photo'>
                  {photo.image && <img src={`${uploads}\\photos\\${photo.image}`} alt={photo.title} />}
                  <div className='actions'>
                    {id === authUser._id ? (
                      <>
                        <Link to={`/photos/${photo._id}`}><BsFillEyeFill/></Link>
                        <BsPencilFill onClick={(() => openUpdateForm(photo))}/>
                        <BsXLg onClick={(e) => handleDelete(photo._id, e)}/>
                      </>
                    ) : (<Link className='btn' to={`/photos/${photo._id}`}>Ver foto</Link>)}
                  </div>
                </div>
            ))}
          </div>
        )}
        {photos.length === 0 && <p>Ainda não há fotos publicadas</p>}
      </div>
      {error && <p>{error}</p>}
    </div>
  )
}

export default Profile