// styles
import "./Auth.css"
// router
import { Link } from 'react-router-dom'
// hooks
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
// redux
import { register, reset } from "../../slices/authSlice"
// components
import Message from "../../components/Message/Message.jsx"

const Register = () => {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const dispatch = useDispatch()
  const { loading, error } = useSelector((state) => state.auth)
 
  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      name,
      email,
      password,
      confirmPassword
    }
    
    dispatch(register(user))
  }

  useEffect(() => {
    dispatch(reset())
  }, [dispatch])

  return (
    <div id="register">
      <h2>Reactgram</h2>
      <p className="subtitle">Cadastre-se e comece a postar!</p>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)}/>
        <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <input type="password" placeholder="Confirme a senha" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
        {!loading && <input type="submit" value="Cadastrar"/>}
        {loading && <input type="submit" value="Aguarde..." disabled/>}
        {error && <Message message={error} type="error"/>}
      </form>
      <p>Já tem conta? <Link to="/login">Clique Aqui</Link></p>
    </div>
  )
}

export default Register