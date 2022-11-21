import exit from './exit.svg';
import add from './add.svg';
import remove from './remove.svg';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function WalletPage({username, token}) {
    const navigate = useNavigate();
    const [moviments, setMoviments] = useState([]);
    const [balance, setBalance] = useState(0);

    const showRegisters = Boolean(moviments.length);
    
    useEffect(requestData, []);

    function requestData() {
        const url = 'http://localhost:5000/wallet';
        const config = {headers: {'Authorization': `Bearer ${token}`}};

        axios.get(url, config)
            .then(({data}) => setMoviments(data))
            .catch(() => navigate('/'));
    }

    function Wallet({date, description, type, value, _id}) {
        const floatFormat = Number(value).toFixed(2);
        const brValue = floatFormat.replace('.', ',');

        return (
            <MovimentStyles key={_id} type={type}>
                <time>{date}</time>
                <p>{description}</p>
                <span>{brValue}</span>
            </MovimentStyles>
        )
    }
    
    function calculeBalance() {
        let sum = 0;

        for (const moviment of moviments) {
            const floatFormat = moviment.value.replace(',', '.');
            const numberFormat = Number(floatFormat);
    
            if (moviment.type === 'in') {
                sum += numberFormat;
            } else {
                sum -= numberFormat;
            }
        }

        setBalance(sum);
    }

    useEffect(calculeBalance, [moviments]);

    async function quit() {
        const url = 'http://localhost:5000/exit';
        const config = {headers: {'Authorization': `Bearer ${token}`}};

        await axios.delete(url, config);
        navigate('/');
    }

    return (
        <WalletStyles showRegisters={showRegisters} balance={balance}>
            <header>
                <h1>Olá, {username}</h1>
                <img onClick={quit} src={exit} alt='Sair'/>
            </header>
            <main>
                <p hidden={showRegisters}>Não há registros de<br/>entrada ou saída</p>
                <section>
                    {moviments.map(Wallet)}
                </section>
                <section>
                    <span>SALDO</span>
                    <span>{balance.toFixed(2).replace('.', ',')}</span>
                </section>
            </main>
            <footer>
                <Link to='/add-moviment/in'>
                    <div>
                        <img src={add} alt='Nova entrada'/>
                        <span>Nova<br/>entrada</span>
                    </div>
                </Link>
                <Link to='/add-moviment/out'>
                    <div>
                        <img src={remove} alt='Nova saída'/>
                        <span>Nova<br/>saída</span>
                    </div>
                </Link>
            </footer>
        </WalletStyles>
    );
}

const WalletStyles = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #8C11BE;

    header {
        position: fixed;
        top: 0;
        z-index: 1;
        width: 100%;
        height: 78px;
        padding: 0 calc((100% - 326px)/2);
        display: flex;
        justify-content: space-between;
        align-items: center;

        h1 {
            font-family: 'Raleway', sans-serif;
            font-weight: 700;
            font-size: 26px;
            line-height: 31px;
            color: #FFFFFF;
        }
    }

    main {
        margin-top: 78px;
        width: 326px;
        height: calc(100% - 78px - 143px);
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background-color: #FFFFFF;

        >p {
            margin: auto auto;
            font-family: 'Raleway', sans-serif;
            font-weight: 400;
            font-size: 20px;
            line-height: 23px;
            color: #868686;
            text-align: center;
        }

        section:nth-of-type(1) {
            padding: 23px 11px 0 12px;
            row-gap: 15px;
            display: ${({showRegisters}) => showRegisters ? 'flex' : 'none'};
            flex-direction: column;
            justify-content: space-between;
            overflow-y: scroll;
        }
        
        section:nth-of-type(2) {
            width: 100%;
            min-height: 40px;
            border-radius: 5px;
            padding: 0 11px 0 15px;
            display: ${({showRegisters}) => showRegisters ? 'flex' : 'none'};
            align-items: center;
            justify-content: space-between;
            background-color: #FFFFFF;

            span:nth-of-type(1) {
                font-family: 'Raleway', sans-serif;
                font-weight: 700;
                font-size: 17px;
                line-height: 20px;
                color: #000000;
            }

            span:nth-of-type(2) {
                width: 235px;
                text-align: right;
                font-family: 'Raleway', sans-serif;
                font-weight: 400;
                font-size: 17px;
                line-height: 20px;
                color: ${({balance}) => {
                    if (balance < 0) return '#C70000';
                    if (balance === 0) return '#000000';
                    if (balance > 0) return '#03AC00';
                }};
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
    }

    footer {
        position: fixed;
        bottom: 0;
        z-index: 1;
        width: 100%;
        height: 143px;
        display: flex;
        justify-content: center;
        column-gap: 15px;

        a {
            text-decoration: none;

            div {
                width: 155px;
                height: 114px;
                margin-top: 13px;
                border-radius: 5px;
                padding: 9px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                background-color: #A328D6;

                img {
                    width: 25px;
                }

                span {
                    font-family: 'Raleway', sans-serif;
                    font-weight: 700;
                    font-size: 17px;
                    line-height: 20px;
                    color: #FFFFFF;
                }
            }
        }
    }
`;

const MovimentStyles = styled.div`
    display: flex;

    time {
        margin-right: 5px;
        font-family: 'Raleway', sans-serif;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        color: #C6C6C6;
    }

    p {
        width: 180px;
        font-family: 'Raleway', sans-serif;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        color: #000000;
        word-wrap: break-word;
    }

    span {
        margin-left: auto;
        margin-right: 0;
        font-family: 'Raleway', sans-serif;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        text-align: right;
        color: ${({type}) => type === 'in' ? '#03AC00' : '#C70000'};
    }
`;