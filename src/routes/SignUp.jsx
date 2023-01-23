import styled from "styled-components"
import { InputStyle } from "../components/Input"
import Button from "../components/Button"
import Logo from "../assets/img/MyWallet.png"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { FallingLines } from "react-loader-spinner"
import axios from "axios"

export default function SignUp() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    function sendSignUpRequest(e) {
        e.preventDefault()
        setLoading(true)

        const body = {
            name,
            email,
            password,
            confirmPassword
        }

        const promise = axios.post(`${process.env.REACT_APP_API_URL}/sign-up`, body)
        promise.then(res => {
            alert("Usuário cadastrado com sucesso!")
            setLoading(false)
            navigate('/')
        })
        promise.catch(err => {
            alert(err.response.data)
            setLoading(false)
        })

    }

    return (
        <SignUpContainer>
            <div>
                <img src={Logo} alt="Logo" />
                <FormSignUp onSubmit={e => sendSignUpRequest(e)}>
                    <InputStyle disabled={loading} onChange={e => setName(e.target.value)} type="text" placeholder='Nome' value={name} />
                    <InputStyle disabled={loading} onChange={e => setEmail(e.target.value)} type="email" placeholder='E-mail' value={email} />
                    <InputStyle disabled={loading} onChange={e => setPassword(e.target.value)} type="password" placeholder="Senha" value={password} />
                    <InputStyle disabled={loading} onChange={e => setConfirmPassword(e.target.value)} type="password" placeholder='Confirme a senha' value={confirmPassword} />
                    <Button
                        disabled={loading}
                        type="submit"
                        text={(loading) ?
                            <FallingLines
                                color="#FFFF"
                                width="100"
                                visible={true}
                                ariaLabel='falling-lines-loading'
                            /> :
                            "Cadastrar"}
                    />
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

    > div{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;

        width: 90%;
        height: 450px;

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
    height: 350px;
    width: 100%;

`