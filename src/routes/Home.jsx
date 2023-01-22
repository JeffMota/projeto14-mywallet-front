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
    const [total, setTotal] = useState('')

    useEffect(() => {

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        const promise = axios.get(`${process.env.REACT_APP_API_URL}/registries`, config)
        promise.then(res => {
            const data = res.data
            setRegistries(data.registries)
            setTotal(data.total)
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
                <RegistriesTable positive={(total >= 0) ? true : false}>
                    {(registries && registries.length !== 0) ?
                        <div>
                            <div>
                                {registries.map(reg =>
                                    <Registrie type={reg.type} key={reg._id}>
                                        <div>
                                            <p>{reg.date}</p>
                                            <p>{reg.description}</p>
                                        </div>
                                        <p>{String(reg.value.toFixed(2)).replace('.', ',')}</p>
                                    </Registrie>
                                )}
                            </div>
                            <div>
                                <p>SALDO</p>
                                <p>{String(total.toFixed(2)).replace('.', ',')}</p>
                            </div>
                        </div> :
                        <p>Não há registros de entrada ou saída</p>
                    }
                </RegistriesTable>
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
const RegistriesTable = styled.div`
    display: flex;
    height: 70%;
    font-size: 20px;
    justify-content: center;

    border: none;
    border-radius: 5px;
    padding: 10px;
    background-color: #FFFFFF;

    >div{
        display: flex;
        flex-direction:column;

        justify-content: space-between;

        width: 100%;

        >:nth-child(2){
            display: flex;
            justify-content: space-between;

            >:nth-child(1){
                font-weight: 700;
            }
            >:nth-child(2){
                color: ${props => (props.positive) ? 'green' : 'red'};
            }
        }
    }

    >p{
        display: flex;
        width: 70%;
        height: 100%;
        justify-content: center;
        align-items: center;
        text-align: center;
        color: #868686;
    }
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
const Registrie = styled.div`
    display: flex;
    justify-content: space-between;

    width: 100%;

    font-size: 16px;

    margin: 10px 0;
    >div{
        display: flex;

        >:nth-child(1){
            color: gray;
            margin-right: 10px;
        }

    }

    >p{

        color: ${props => (props.type === 'entrada') ? 'green' : 'red'};
    }
`