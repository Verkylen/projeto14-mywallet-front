import styled from "styled-components"

const AuthenticationStyles = styled.main`
    height: 100vh;
    background-color: #8C11BE;
    display: flex;
    flex-direction: column;
    align-items: center;

    p:first-of-type {
        margin-bottom: 13px;
        width: 326px;
        border: 1px solid ${({messageColor}) => messageColor};
        border-radius: 5px;
        padding: 0 5px;
        display: ${({popUp}) => popUp ? 'flex' : 'none'};
        justify-content: space-between;
        align-items: center;
        font-family: 'Raleway', sans-serif;
        font-weight: 400;
        font-size: 20px;
        line-height: 23px;
        color: ${({messageColor}) => messageColor};
    }
    
    h1 {
        margin-top: ${({marginTop}) => marginTop}px;
        margin-bottom: 24px;
        font-family: 'Saira Stencil One', sans-serif;
        font-weight: 400;
        font-size: 32px;
        line-height: 50.37px;
        color: #FFFFFF;
    }

    form {
        display: flex;
        flex-direction: column;
        row-gap: 13px;

        input:nth-of-type(-n+${({inputsNumber}) => inputsNumber}) {
            padding-left: 15px;
            width: 326px;
            height: 58px;
            border: none;
            border-radius: 5px;
            outline: none;
            font-family: 'Raleway' sans-serif;
            font-weight: 400;
            font-size: 20px;
            line-height: 23px;
            color: #000000;

            ::placeholder {
                color: #000000;
            }
        }

        input:last-of-type {
            width: 326px;
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

    p:last-of-type {
        margin-top: 36px;
        font-family: 'Raleway', sans-serif;
        font-weight: 700;
        font-size: 15px;
        line-height: 18px;
        color: #FFFFFF;

        a {
            color: #FFFFFF;
            text-decoration: none;
        }
    }
`

export default AuthenticationStyles;