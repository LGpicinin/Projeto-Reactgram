// styles
import './EditProfile.css'
// hooks
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { profile, resetMessage } from '../../slices/userSlice'

const EditProfile = () => {
    
    const [name, setName] = useState("")
    const [bio, setBio] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [profileImage, setProfileImage] = useState("")
    const [previewImage, setPreviewImage] = useState("")
    const {user, loading, error} = useSelector((state) => state.user)
    const dispatch = useDispatch()

    useEffect(() => {
       dispatch(profile())
    }, [dispatch])

    useEffect(() => {
        if(user){
            setName(user.name)
            setBio(user.bio)
            setEmail(user.email)
        }
    }, [user])

    const handleSubmit = (e) => {
        e.preventDefault()
    }


    return (
        <div id='edit-profile'>
            <h2>Edite seu perfil</h2>
            <p className='subtitle'>Adicione uma imagem de perfil</p>
            {/* profile image */}
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Nome' value={name || ""} onChange={(e) => setName(e.target.value)}/>
                <input type="email" placeholder='E-mail' value={email || ""} disabled/>
                <label>
                    <span>Imagem do perfil:</span>
                    <input type="file" />
                </label>
                <label>
                    <span>Bio:</span>
                    <input type="text" placeholder='Descrição do perfil' value={bio || ""} onChange={(e) => setBio(e.target.value)}/>
                </label>
                <label>
                    <span>Alterar senha?</span>
                    <input type="password" placeholder='Senha' value={password} onChange={(e) => setPassword(e.target.value)}/>
                </label>
                <input type="submit" value="Atualizar"/>
            </form>
        </div>
    )
}

export default EditProfile