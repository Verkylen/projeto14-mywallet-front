import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

export default function AddMovimentPage({token}) {
    const navigate = useNavigate();
    const {type} = useParams();
    const [disabled, setDisabled] = useState(false);

    async function submit(e) {
        e.preventDefault();

        setDisabled(true);

        const insertedValue = e.target[0].value;
        const description = e.target[1].value;

        const numberFormat = Number(insertedValue.replace(',', '.'));
        const value = numberFormat.toFixed(2);

        const url = 'http://localhost:5000/wallet';
        const body = {value, description, type};
        const config = {headers: {'Authorization': `Bearer ${token}`}};
        try {
            await axios.post(url, body, config);
            navigate('/wallet');
        } catch({}) {
            navigate('/');
        }
    }

    return (
        <AddMovimentStyles>
            <h1>Nova {type === 'in' ? 'entrada' : 'saída'}</h1>
            <form onSubmit={submit}>
                <input
                    type='text'
                    placeholder='Valor'
                    pattern='[0-9]{1,6}(,[0-9]{1,2})?'
                    title='Exemplo: 1234,56 Máximo: 999999,99'
                    required
                />
                <input
                    type='text'
                    placeholder='Descrição'
                    required
                />
                <input
                    type='submit'
                    value={'Salvar ' + (type === 'in' ? 'entrada' : 'saída')}
                    disabled={disabled}
                />
            </form>
        </AddMovimentStyles>
    );
}

const AddMovimentStyles = styled.main`
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #8C11BE;

    h1 {
        width: 326px;
        margin-top: 25px;
        margin-bottom: 40px;
        font-family: 'Raleway', sans-serif;
        font-weight: 700;
        font-size: 26px;
        line-height: 31px;
        color: #FFFFFF;
    }
    
    form {
        width: 326px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        row-gap: 13px;

        input:nth-of-type(-n+2) {
            height: 58px;
            border: none;
            border-radius: 5px;
            padding-left: 15px;
            outline: none;
            font-family: 'Raleway', sans-serif;
            font-weight: 400;
            font-size: 20px;
            line-height: 23px;
            color: #000000;

            ::placeholder {
                color: #000000;
            }
        }

        input:last-of-type {
            height: 46px;
            border: none;
            border-radius: 5px;
            background-color: #A328D6;
            font-family: 'Raleway', sans-serif;
            font-weight: 700;
            font-size: 20px;
            line-height: 23px;
            color: #FFFFFF;
        }
    }
`