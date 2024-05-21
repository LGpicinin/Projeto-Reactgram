// styles
import './EditProfile.css'
// hooks
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUser } from '../../slices/authSlice'

const EditProfile = () => {
    
    const [name, setName] = useState("")
    const [profile, setProfile] = useState(null)
    const {user} = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    useEffect(() => {
        async function getProfile(){
            let data
            if(user._id)
                data = await getUser(user._id)
                console.log(data)
                if(data._id){
                    setProfile(data)
                }
        }
        getProfile()
    }, [user])

    useEffect(() => {
        if(profile){
            setName(profile.name)
        }
    }, [profile])

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    console.log(profile)


    return (
        <div id='edit-profile'>
            <h2>Edite seu perfil</h2>
            <p>Adicione uma imagem de perfil</p>
            {/* profile image */}
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Nome'/>
                <input type="email" placeholder='E-mail'/>
                <label>
                    <span>Imagem do perfil:</span>
                    <input type="file" />
                </label>
                <label>
                    <span>Bio:</span>
                    <input type="text" placeholder='Descrição do perfil'/>
                </label>
                <label>
                    <span>Alterar senha?</span>
                    <input type="password" placeholder='Senha' />
                </label>
                <input type="submit" value="Atualizar"/>
            </form>
        </div>
    )
}

export default EditProfile