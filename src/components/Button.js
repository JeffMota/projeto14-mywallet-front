import styled from "styled-components"

export default function Button({ type, text }) {
    return (
        <ButtonStyle type={type} >{text}</ButtonStyle>
    )
}

const ButtonStyle = styled.button`
    height: 46px;

    font-weight: 700;
    font-size: 20px;
    color: #FFFFFF;

    border: none;
    border-radius: 5px;

    background-color: #A328D6;
`