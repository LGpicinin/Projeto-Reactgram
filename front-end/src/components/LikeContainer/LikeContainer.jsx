// styles
import './LikeContainer.css'

// icons
import {BsHeartFill, BsHeart} from 'react-icons/bs'

const LikeContainer = ({photo, user, handleLike}) => {
  return (
    <div className='like'>
        {photo.likes && user && (
            <>
                {photo.likes.includes(user._id) ? (<BsHeartFill/>) : (<BsHeart onClick={() => handleLike(photo._id)}/>)}
                <p>{photo.likes.length} curtidas</p>
            </>
        )}
    </div>
  )
}

export default LikeContainer