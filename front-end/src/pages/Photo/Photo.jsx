// styles
import './Photo.css'

// config
import { uploads } from '../../utils/config'

// components
import Message from '../../components/Message/Message'
import { Link } from 'react-router-dom'
import PhotoItem from '../../components/PhotoItem/PhotoItem'

// hooks
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// redux
import { getPhoto, likePhoto } from '../../slices/photoSlice'
import LikeContainer from '../../components/LikeContainer/LikeContainer'


const Photo = () => {

    const { id } = useParams()
    const dispatch = useDispatch()
    const { loading, error, photo } = useSelector((state) => state.photo)
    const { user } = useSelector((state) => state.auth)

    useEffect(() => {
        if(id)
            dispatch(getPhoto(id))
    }, [id])

    const handleLike = (photoId) => {
        dispatch(likePhoto(photoId))
    }
    return (
        <div id='photo'>
            {!loading && (
                <>
                    <PhotoItem photo={photo}/>
                    <LikeContainer photo={photo} user={user} handleLike={handleLike}/>
                </>
            )}
            {loading && <p>Carregando...</p>}
        </div>
        
    )
}

export default Photo