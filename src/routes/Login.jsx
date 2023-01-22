import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { InputStyle } from "../components/Input";
import styled from "styled-components";
import Logo from "../assets/img/MyWallet.png"
import Button from "../components/Button";
import axios from "axios";


export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    function sendLoginRequest(e) {
        e.preventDefault()

        const body = {
            email,
            password
        }

        const promise = axios.post(`${process.env.REACT_APP_API_URL}/sign-in`, body)
        promise.then(res => {
            localStorage.setItem('token', JSON.stringify(res.data))

            navigate('/home')
        })
        promise.catch(err => {
            alert(err.response.data)
        })
    }

    return (
        <LoginContainer>
            <div>
                <img src={Logo} alt="Logo" />
                <FormLogin onSubmit={e => sendLoginRequest(e)}>
                    <InputStyle onChange={e => setEmail(e.target.value)} type="email" placeholder='E-mail' value={email} />
                    <InputStyle onChange={e => setPassword(e.target.value)} type="password" placeholder="Senha" value={password} />
                    <Button type="submit" text="Entrar" />
                </FormLogin>
                <p>Primeira vez?<Link to={'/cadastro'}> Cadastre-se!</Link></p>
            </div>
        </LoginContainer>
    )
}

const LoginContainer = styled.div`
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
        height: 50%;

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

const FormLogin = styled.form`
    display: flex;
    flex-direction: column;

    justify-content: space-between;
    height: 60%;
    width: 100%;

`