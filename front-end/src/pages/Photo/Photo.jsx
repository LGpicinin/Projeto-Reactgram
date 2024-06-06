// styles
import './Photo.css'

// config
import { uploads } from '../../utils/config'

// components
import Message from '../../components/Message/Message'
import { Link } from 'react-router-dom'
import PhotoItem from '../../components/PhotoItem/PhotoItem'
import LikeContainer from '../../components/LikeContainer/LikeContainer'
import CommentContainer from '../../components/CommentContainer/CommentContainer'

// hooks
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useResetMessage } from '../../hooks/useResetMessage'

// redux
import { getPhoto, likePhoto, commentPhoto } from '../../slices/photoSlice'


const Photo = () => {

    const { id } = useParams()
    const dispatch = useDispatch()
    const { loading, error, photo, message } = useSelector((state) => state.photo)
    const { user } = useSelector((state) => state.auth)
    const resetMessage = useResetMessage(dispatch, "photo")

    useEffect(() => {
        if(id)
            dispatch(getPhoto(id))
    }, [id])

    const handleLike = (photoId) => {
        dispatch(likePhoto(photoId))
        resetMessage()
    }

    const handleComment = (photoId, comment) => {
        const data = {
            photoId,
            comment,
        }
        dispatch(commentPhoto(data))
        resetMessage()
    }

    return (
        <div id='photo'>
            {!loading && (
                <>
                    <PhotoItem photo={photo}/>
                    <LikeContainer photo={photo} user={user} handleLike={handleLike}/>
                    {error && <Message type="error" message={error}/>}
                    {message && <Message type="success" message={message}/>}
                    <CommentContainer photo={photo} handleComment={handleComment}/>
                </>
            )}
            {loading && <p>Carregando...</p>}
        </div>
        
    )
}

export default Photo