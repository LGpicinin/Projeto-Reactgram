// styles
import './Search.css'
// hooks
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useResetMessage } from '../../hooks/useResetMessage'
import { useQuery } from '../../hooks/useQuery'
// redux
import { searchPhotos, likePhoto } from '../../slices/photoSlice'
// components
import { Link } from 'react-router-dom'
import Message from '../../components/Message/Message'
import LikeContainer from '../../components/LikeContainer/LikeContainer'
import PhotoItem from '../../components/PhotoItem/PhotoItem'

const Search = () => {

    // query
    const query = useQuery();
    const search = query.get("q");
    // hooks
    const dispatch = useDispatch()
    const {photos, loading, error, message} = useSelector((state) => state.photo)
    const {user} = useSelector((state) => state.auth)
    const resetMessage = useResetMessage(dispatch, "photo")
    

    useEffect(() => {
        dispatch(searchPhotos(search))
    }, [search, dispatch])

    const handleLike = (photoId) => {
        dispatch(likePhoto(photoId))
        resetMessage()
    }

    if(loading) {
        return <p>Carregando...</p>
    }

    return (
        <div id='search'>
            <h3>Resultados da busca por: {search}</h3>
            {photos && photos.length > 0 && (
                <div className="photos-home-search">
                    {photos.map((photo) => (
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
            {photos && photos.length === 0 && <p>Nenhuma publicação encontrada</p>}
        </div>
    )
}

export default Search