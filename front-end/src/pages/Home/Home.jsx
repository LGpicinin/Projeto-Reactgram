// hooks
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
// redux
import { getAllPhotos } from "../../slices/photoSlice"
// components
import PhotoItem from "../../components/PhotoItem/PhotoItem"
// styles
import './Home.css'

const Home = () => {

  // redux
  const dispatch = useDispatch()
  const {photos, error, loading} = useSelector((state) => state.photo)

  useEffect(() => {
    dispatch(getAllPhotos(null))
  }, [dispatch])

  if(loading){
    return <p>Carregando...</p>
  }

  return (
    <div id="home">
      <h3>Publicações recentes:</h3>
      {photos && (
        <div id="photos-home">
              {photos.length > 0 && photos.map((photo) => (
                <div key={photo._id}>
                   <PhotoItem photo={photo}/>
                </div>
              ))}
        </div>
      )}
      {photos.length === 0 && <p>Não há publicações :(</p>}
      {error && <p>{error}</p>}
    </div>
  )
}

export default Home