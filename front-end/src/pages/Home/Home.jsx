// hooks
import { useSelector, useDispatch } from "react-redux"
import { useResetMessage } from "../../hooks/useResetMessage"
import { useEffect } from "react"
// redux
import { getAllPhotos, likePhoto } from "../../slices/photoSlice"
// components
import PhotoItem from "../../components/PhotoItem/PhotoItem"
import LikeContainer from "../../components/LikeContainer/LikeContainer"
import Message from "../../components/Message/Message"
import { Link } from "react-router-dom"
// styles
import './Home.css'

const Home = () => {

  // redux
  const dispatch = useDispatch()
  const {photos, error, loading, message} = useSelector((state) => state.photo)
  const {user} = useSelector((state) => state.auth)
  const resetMessage = useResetMessage(dispatch, "photo")

  useEffect(() => {
    dispatch(getAllPhotos(null))
  }, [dispatch])

  const handleLike = (photoId) => {
    dispatch(likePhoto(photoId))
    resetMessage()
  }

  if(loading){
    return <p>Carregando...</p>
  }

  return (
    <div id="home">
      {photos && (
        <div className="photos-home-search">
              {photos.length > 0 && photos.map((photo) => (
                <div key={photo._id} className="photos-home-search-container">
                   <PhotoItem photo={photo}/>
                   <LikeContainer photo={photo} user={user} handleLike={handleLike}/>
                   <Link className="btn" to={`/photos/${photo._id}`}>Ver detalhes</Link>
                   {error && <Message type="error" message={error}/>}
                   {message && <Message type="success" message={message}/>}
                </div>
              ))}
        </div>
      )}
      {photos && photos.length === 0 && <p>Não há publicações</p>}
      {error && <p>{error}</p>}
    </div>
  )
}

export default Home