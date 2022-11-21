import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyle from './GlobalStyle';
import AddMovimentPage from './AddMovimentPage';
import SignInPage from './SignInPage';
import SignUpPage from './SignUpPage';
import WalletPage from './WalletPage';
import { useState } from 'react';

export default function App() {
    const [username, setUsername] = useState('');
    const [token, setToken] = useState('');

    return (
        <>
            <GlobalStyle/>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<SignInPage setUsername={setUsername} setToken={setToken}/>}/>
                    <Route path="/sign-up" element={<SignUpPage/>}/>
                    <Route path="/wallet" element={<WalletPage username={username} token={token}/>}/>
                    <Route path="/add-moviment/:type" element={<AddMovimentPage token={token}/>}/>
                </Routes>
            </BrowserRouter>
        </>
  );
}