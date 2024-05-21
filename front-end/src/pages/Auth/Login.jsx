// styles
import "./Auth.css"
// react-router
import { Link } from "react-router-dom"
// hooks
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
//redux
import { login, reset } from "../../slices/authSlice"
//components
import Message from "../../components/Message/Message"

const Login = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()
  const { loading, error } = useSelector((state) => state.auth)

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    }

    dispatch(login(user))

  }

  useEffect(() => {
    dispatch(reset())
  }, [dispatch])


  return (
    <div id="login">
      <h2>Reactgram</h2>
      <p className="subtitle">Faça o login e comece a postar!</p>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)}/>
        {!loading && <input type="submit" value="Entrar"/>}
        {loading && <input type="submit" value="Aguarde..." disabled/>}
        {error && <Message type="error" message={error}/>}
      </form>
      <p>Não tem conta? <Link to="/register">Clique Aqui</Link></p>
    </div>
  )
}

export default Login