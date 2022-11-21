import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthenticationStyles from "./AuthenticationStyles";

export default function SignUpPage() {
    const navigate = useNavigate();
    const [popUp, setPopUp] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [message, setMessage] = useState('');
    const [messageColor, setMessageColor] = useState('');

    async function submit(e) {
        e.preventDefault();

        const name = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const rewrittenPassword = e.target[3].value;

        if (password !== rewrittenPassword) {
            setMessage('As senhas informadas não coincidem');
            setMessageColor('#C70000');
            setPopUp(true);

            e.target[0].value = '';
            e.target[1].value = '';
            e.target[2].value = '';
            e.target[3].value = '';

            return;
        }

        setDisabled(true);

        const url = 'http://localhost:5000/sign-up';
        const body = {name, email, password};

        try {
            await axios.post(url, body);
            sucess();
        } catch({}) {
            fail(e.target);
        }
    }

    function sucess() {
        setMessage('Cadastro realizado');
        setMessageColor('#03AC00');
        setPopUp(true);
        navigate('/');
    }

    function fail(input) {
        setDisabled(false);
        setMessage('Email já cadastrado');
        setMessageColor('#C70000');
        setPopUp(true);

        input[0].value = '';
        input[1].value = '';
        input[2].value = '';
        input[3].value = '';
    }

    return (
        <AuthenticationStyles inputsNumber={4} marginTop={95} popUp={popUp} messageColor={messageColor}>
            <h1>MyWallet</h1>
            <p>
                {message}
                <ion-icon onClick={() => setPopUp(false)} name="close-outline"></ion-icon>
            </p>
            <form onSubmit={submit}>
                <input
                    type='text'
                    placeholder='Nome'
                    maxLength={12}
                    required
                />
                <input
                    type='email'
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
                    type='password'
                    placeholder='Confirme a senha'
                    pattern='[^ ]+'
                    required
                />
                <input
                    type='submit'
                    value='Cadastrar'
                    disabled={disabled}
                />
            </form>
            <p>
                <Link to='/'>Já tem uma conta? Entre agora!</Link>
            </p>
        </AuthenticationStyles>
    );
}