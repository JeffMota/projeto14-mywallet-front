import styled from "styled-components"
import { InputStyle } from "../components/Input"
import Button from "../components/Button"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function NovaEntrada() {
    const [value, setValue] = useState('')
    const [description, setDescription] = useState('')

    const token = JSON.parse(localStorage.getItem('token'))

    const navigate = useNavigate()

    function sendEntryReq(e) {
        e.preventDefault()

        const body = {
            value,
            description,
            type: 'entrada'
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

    }

    return (
        <EntryContainer>
            <div>
                <h2>Nova Entrada</h2>
                <FormEntry onSubmit={e => sendEntryReq(e)}>
                    <InputStyle onChange={e => setValue(e.target.value)} type="number" placeholder='Valor' value={value} />
                    <InputStyle onChange={e => setDescription(e.target.value)} type="text" placeholder="Descrição" value={description} />
                    <Button type="submit" text="Salvar entrada" />
                </FormEntry>
            </div>
        </EntryContainer>
    )
}

const EntryContainer = styled.div`
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
const FormEntry = styled.form`
    display: flex;
    flex-direction: column;

    justify-content: space-between;
    height: 73%;
    width: 100%;

`