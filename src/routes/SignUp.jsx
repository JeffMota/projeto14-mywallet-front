import styled from "styled-components"
import { InputStyle } from "../components/Input"
import Button from "../components/Button"
import Logo from "../assets/img/MyWallet.png"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"

export default function SignUp() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const navigate = useNavigate()

    function sendSignUpRequest(e) {
        e.preventDefault()

        const body = {
            name,
            email,
            password,
            confirmPassword
        }

        const promise = axios.post(`${process.env.REACT_APP_API_URL}/sign-up`, body)
        promise.then(res => {
            alert("Usuário cadastrado com sucesso!")
            navigate('/')
        })
        promise.catch(err => {
            alert(err.response.data)
        })

    }

    return (
        <SignUpContainer>
            <div>
                <img src={Logo} alt="Logo" />
                <FormSignUp onSubmit={e => sendSignUpRequest(e)}>
                    <InputStyle onChange={e => setName(e.target.value)} type="text" placeholder='Nome' value={name} />
                    <InputStyle onChange={e => setEmail(e.target.value)} type="email" placeholder='E-mail' value={email} />
                    <InputStyle onChange={e => setPassword(e.target.value)} type="password" placeholder="Senha" value={password} />
                    <InputStyle onChange={e => setConfirmPassword(e.target.value)} type="password" placeholder='Confirme a senha' value={confirmPassword} />
                    <Button type="submit" text="Cadastrar" />
                </FormSignUp>
                <p>Já tem uma conta?<Link to={'/'}> Entre agora!</Link></p>
            </div>
        </SignUpContainer>
    )
}

const SignUpContainer = styled.div`
    display: flex;
    flex-direction: column;

    align-items: center;
    justify-content: center;

    width: 100%;
    height: 100vh;

    > div{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;

        width: 90%;
        height: 65%;

        margin-top: 50px;

        >img{
            width: 147px;
        }

        >p{
            font-size: 15px;
            font-weight: 700;
            color: #FFFFFF;
            
            >a{
                color: #FFFFFF;
            }
        }
    }

    margin-top: 200px;

    margin: auto;
`

const FormSignUp = styled.form`
    display: flex;
    flex-direction: column;

    justify-content: space-between;
    height: 75%;
    width: 100%;

`