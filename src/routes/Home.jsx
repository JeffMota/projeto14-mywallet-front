import styled from 'styled-components'
import signOut from '../assets/img/LogOut.png'
import Less from '../assets/img/Less.png'
import More from '../assets/img/More.png'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Home() {
    let name = JSON.parse(localStorage.getItem('user'))
    const token = JSON.parse(localStorage.getItem('token'))
    name = name[0].toUpperCase() + name.substring(1)

    const [registries, setRegistries] = useState(null)

    useEffect(() => {

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        const promise = axios.get(`${process.env.REACT_APP_API_URL}/registries`, config)
        promise.then(res => {
            const data = res.data
            console.log(data)
            setRegistries(data.registries)
        })
        promise.catch(err => {
            console.log(err.response.data)
        })

    }, [])

    return (
        <HomeContainer>
            <div>
                <Header>
                    <h2>Olá, {name}</h2>
                    <img src={signOut} alt="signOut" />
                </Header>
                <Registries>
                    {(registries) ? registries.map(reg => <div key={reg._id}>{reg.description}</div>) : <p>Não há registros</p>}
                </Registries>
                <ButtonsContainer>
                    <ButtonReg>
                        <img src={More} alt="More" />
                        <p>Nova entrada</p>
                    </ButtonReg>
                    <ButtonReg>
                        <img src={Less} alt="Less" />
                        <p>Nova saída</p>
                    </ButtonReg>
                </ButtonsContainer>
            </div>
        </HomeContainer>
    )
}

const HomeContainer = styled.div`
    display: flex;

    justify-content: center;
    align-items: center;

    height: 100vh;
    width: 100vw;

    >div{
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        width: 90%;
        height: 95%;
    }
`
const Header = styled.div`
    display: flex;
    color: #FFFFFF;
    font-weight: 700;
    font-size: 18px;

    justify-content: space-between;
    align-items: center;

    >img{
        height: 85%;
    }
`
const Registries = styled.div`
    display: flex;
    height: 70%;

    border: none;
    border-radius: 5px;
    background-color: #FFFFFF;
`
const ButtonReg = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    background-color: #A328D6;

    padding: 10px;
    height: 100%;
    width: 48%;

    border: none;
    border-radius: 5px;

    color: #FFFFFF;
    font-size: 19px;
    font-weight: 700;

    >img{
        width: 25px;
    }

    >p{
        width: 50%;
    }
`
const ButtonsContainer = styled.div`
    display: flex;

    justify-content: space-between;
    height: 20%;

`