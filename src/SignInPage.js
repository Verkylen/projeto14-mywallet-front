import { Link, useNavigate } from 'react-router-dom';
import AuthenticationStyles from './AuthenticationStyles';
import axios from 'axios';
import { useState } from 'react';

export default function SignInPage({setUsername, setToken}) {
    const navigate = useNavigate();
    const [disabled, setDisabled] = useState(false);
    const [popUp, setPopUp] = useState(false);
    const [message, setMessage] = useState('');
    const [messageColor, setMessageColor] = useState('');

    async function submit(e) {
        e.preventDefault();

        setDisabled(true);

        const email = e.target[0].value;
        const password = e.target[1].value;

        const url = 'http://localhost:5000/sign-in';
        const body = {email, password};

        try {
            const {data} = await axios.post(url, body);
            sucess(data);
        } catch({}) {
            fail(e.target);
        }
    }

    function sucess({name, token}) {
        setUsername(name);
        setToken(token);

        setMessage('Login realizado');
        setMessageColor('#03AC00');
        setPopUp(true);
        
        navigate('/wallet');
    }

    function fail(input) {
        setMessage('Usuário e/ou senha inválidos');
        setMessageColor('#C70000');
        setPopUp(true);
        setDisabled(false);

        input[0].value = '';
        input[1].value = '';
    }

    return (
        <AuthenticationStyles inputsNumber={2} marginTop={159} popUp={popUp} messageColor={messageColor}>
            <h1>MyWallet</h1>
            <p>
                {message}
                <ion-icon onClick={() => setPopUp(false)} name="close-outline"></ion-icon>
            </p>
            <form onSubmit={submit}>
                <input
                    type='text'
                    placeholder='E-mail'
                    pattern='^[a-zA-Z0-9_+.-]+@[a-zA-Z0-9]+\.[a-zA-Z0-9.]+[^.]$'
                    required
                />
                <input
                    type='password'
                    placeholder='Senha'
                    pattern='[^ ]+'
                    required
                />
                <input
                    type='submit'
                    value='Entrar'
                    disabled={disabled}
                />
            </form>
            <p>
                <Link to='/sign-up'>Primeira vez? Cadastre-se!</Link>
            </p>
        </AuthenticationStyles>
    );
}