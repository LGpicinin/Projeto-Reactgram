// styles
import './CommentContainer.css'
// hooks 
import { useState } from 'react'
// components
import { Link } from 'react-router-dom'
// config
import { uploads } from '../../utils/config'

const CommentContainer = ({photo, handleComment}) => {

    const [comment, setComment] = useState("")

    const sendComment = (e) => {
        e.preventDefault()

        handleComment(photo._id, comment)

        setComment("")
    }

    return (
        <div className='comments'>
            {photo.comments && 
                <>
                    <p>Comentários: ({photo.comments.length})</p>
                    <form onSubmit={(e) => sendComment(e)}>
                        <label>
                            <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} placeholder='Insira seu comentário...'/>
                        </label>
                        <input type="submit" value="Comentar"/>
                    </form>
                    {photo.comments.map((comment) => (
                        <div key={comment.comment} className="comment">
                            <div className='author'>
                                {comment.userImage && (
                                    <img src={`${uploads}\\users\\${comment.userImage}`} alt={comment.userName} />
                                )}
                                <p><Link to={`/users/${comment.userId}`}>{comment.userName}</Link></p>
                            </div>
                            <p>{comment.comment}</p>
                        </div>
                    ))}
                    {photo.comments.length === 0 && <p>Não há comentários</p>}
                </>
            }
        </div>
    )
}

export default CommentContainer