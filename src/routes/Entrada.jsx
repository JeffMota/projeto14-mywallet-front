import styled from "styled-components"
import { InputStyle } from "../components/Input"
import Button from "../components/Button"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { FallingLines } from "react-loader-spinner"
import Home from "../assets/img/Home.svg"

export default function NovaEntrada() {
    const [value, setValue] = useState('')
    const [description, setDescription] = useState('')

    const [loading, setLoading] = useState(false)

    const token = JSON.parse(localStorage.getItem('token'))

    const navigate = useNavigate()

    function sendEntryReq(e) {
        e.preventDefault()
        setLoading(true)

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
            setLoading(false)
            navigate('/home')
        })
        promise.catch(err => {
            setLoading(false)
            alert('Todos os campos são obrigatórios!')
        })
    }

    return (
        <EntryContainer>
            <div>
                <div>
                    <h2>Nova entrada</h2>
                    <img onClick={() => navigate('/home')} src={Home} alt="Home" />
                </div>
                <FormEntry onSubmit={e => sendEntryReq(e)}>
                    <InputStyle disabled={loading} onChange={e => setValue(e.target.value)} type="number" placeholder='Valor' value={value} />
                    <InputStyle disabled={loading} onChange={e => setDescription(e.target.value)} type="text" placeholder="Descrição" value={description} />
                    <Button
                        disabled={loading}
                        type="submit"
                        text={(loading) ?
                            <FallingLines
                                color="#ffff"
                                width="50"
                                visible={true}
                                ariaLabel='falling-lines-loading'
                            /> : "Salvar entrada"} />
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

        >div{
            display: flex;
            justify-content: space-between;
            >h2{
                font-weight: 700;
                font-size: 26px;
                color: #FFFF;
            }
            >img{
                width: 60px;
                height: 30px;
            }
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