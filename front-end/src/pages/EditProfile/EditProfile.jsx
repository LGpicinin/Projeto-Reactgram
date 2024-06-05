// styles
import './EditProfile.css'
// hooks
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useResetMessage } from '../../hooks/useResetMessage'
// slice
import { profile, updateProfile } from '../../slices/userSlice'
// config
import { uploads } from '../../utils/config'
// components
import Message from '../../components/Message/Message'

const EditProfile = () => {
    
    // user
    const [name, setName] = useState("")
    const [bio, setBio] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [profileImage, setProfileImage] = useState("")
    const [previewImage, setPreviewImage] = useState("")
    // redux
    const {user, loading, error, message} = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const resetMessage = useResetMessage(dispatch)

    useEffect(() => {
        dispatch(profile())
    }, [dispatch])

    useEffect(() => {
        if(user){
            setName(user.name)
            setBio(user.bio)
            setEmail(user.email)

            console.log(user)
        }
    }, [user])

    const handleSubmit = async(e) => {
        e.preventDefault()

        const profileData = {
            name
        }

        if(bio) {
            profileData.bio = bio
        }

        if(profileImage) {
            console.log(profileImage)
            profileData.profileImage = profileImage
        }

        if(password) {
            profileData.password = password
        }

        const formData = new FormData()

        const userFormData = Object.keys(profileData).forEach((key) => {
            formData.append(key, profileData[key])
        })

        formData.append('user', userFormData)


        await dispatch(updateProfile(formData))

        resetMessage()
    }

    const handleImage = (e) => {
        const image = e.target.files[0]

        console.log(image)

        setPreviewImage(image)
        setProfileImage(image)
    }



    return (
        <div id='edit-profile'>
            <h2>Edite seu perfil</h2>
            <p className='subtitle'>Adicione uma imagem de perfil</p>
            {(user.profileImage || previewImage) && (
                <img className='profile-image' src={previewImage ? URL.createObjectURL(previewImage) : `${uploads}\\users\\${user.profileImage}`} alt="Imagem de perfil" />
            )}
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Nome' value={name || ""} onChange={(e) => setName(e.target.value)}/>
                <input type="email" placeholder='E-mail' value={email || ""} disabled/>
                <label>
                    <span>Imagem do perfil:</span>
                    <input type="file" onChange={handleImage}/>
                </label>
                <label>
                    <span>Bio:</span>
                    <input type="text" placeholder='Descrição do perfil' value={bio || ""} onChange={(e) => setBio(e.target.value)}/>
                </label>
                <label>
                    <span>Alterar senha?</span>
                    <input type="password" placeholder='Senha' value={password} onChange={(e) => setPassword(e.target.value)}/>
                </label>
                {!loading && <input type="submit" value="Atualizar"/>}
                {loading && <input type="submit" value="Aguarde..." disabled/>}
            </form>
            {error && <Message type="error" message={error}/>}
            {message && <Message type="success" message={message}/>}
        </div>
    )
}

export default EditProfile