import styled from "styled-components"
import { InputStyle } from "../components/Input"
import Button from "../components/Button"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function NovaSaida() {
    const [value, setValue] = useState('')
    const [description, setDescription] = useState('')

    const token = JSON.parse(localStorage.getItem('token'))

    const navigate = useNavigate()

    function sendWithdrawReq(e) {
        e.preventDefault()

        const body = {
            value,
            description,
            type: 'saida'
        }

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        const promise = axios.post(`${process.env.REACT_APP_API_URL}/registries`, body, config)
        promise.then(res => {
            navigate('/home')
        })
        promise.catch(err => {
            alert('Todos os campos são obrigatórios!')
        })

    }

    return (
        <WithdrawContainer>
            <div>
                <h2>Nova Saida</h2>
                <FormWithdraw onSubmit={e => sendWithdrawReq(e)}>
                    <InputStyle onChange={e => setValue(e.target.value)} type="number" placeholder='Valor' value={value} />
                    <InputStyle onChange={e => setDescription(e.target.value)} type="text" placeholder="Descrição" value={description} />
                    <Button type="submit" text="Salvar saida" />
                </FormWithdraw>
            </div>
        </WithdrawContainer>
    )
}

const WithdrawContainer = styled.div`
    display: flex;
    flex-direction: column;

    align-items: center;

    width: 100%;
    height: 100vh;

    padding: 20px 0;

    >div{
        display: flex;
        flex-direction: column;
        align-items: left;
        justify-content: space-between;

        width: 90%;
        height: 40%;

        >h2{
            font-weight: 700;
            font-size: 26px;
            color: #FFFF;
        }
    }
`
const FormWithdraw = styled.form`
    display: flex;
    flex-direction: column;

    justify-content: space-between;
    height: 73%;
    width: 100%;

`