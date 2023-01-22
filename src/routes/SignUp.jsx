import styled from "styled-components"
import { InputStyle } from "../components/Input"
import Button from "../components/Button"
import Logo from "../assets/img/MyWallet.png"
import { Link } from "react-router-dom"

export default function SignUp() {
    return (
        <SignUpContainer>
            <div>
                <img src={Logo} alt="Logo" />
                <FormSignUp>
                    <InputStyle type="text" placeholder='Nome' />
                    <InputStyle type="email" placeholder='E-mail' />
                    <InputStyle type="password" placeholder="Senha" />
                    <InputStyle type="password" placeholder='Confirme a senha' />
                    <Button type="submit" text="Entrar" />
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