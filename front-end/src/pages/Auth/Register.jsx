// styles
import "./Auth.css"
// router
import { Link } from 'react-router-dom'
// hooks
import { useState, useEffect } from "react"

const Register = () => {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      name,
      email,
      password,
      confirmPassword
    }

    console.log(user)
  }

  return (
    <div id="register">
      <h2>Reactgram</h2>
      <p className="subtitle">Cadastre-se e comece a postar!</p>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)}/>
        <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <input type="password" placeholder="Confirme a senha" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
        <input type="submit" value="Cadastrar"/>
      </form>
      <p>Já tem conta? <Link to="/login">Clique Aqui</Link></p>
    </div>
  )
}

export default Register