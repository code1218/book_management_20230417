/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React from 'react';
import { Link } from 'react-router-dom';
import LoginInput from '../../components/UI/Login/LoginInput/LoginInput';
import { FiUser, FiLock } from 'react-icons/fi';
import { BiRename } from 'react-icons/bi';

const container = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 80px 30px;
`;

const logo = css`
    margin: 50px 0px;
    font-size: 34px;
    font-weight: 600;
`;

const mainContainer = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid #dbdbdb;
    border-radius: 10px;
    padding: 40px 20px;
    width: 400px;
`;

const authForm = css`
    width: 100%;
`;

const inputLabel = css`
    margin-left: 5px;
    font-size: 12px;
    font-weight: 600;
`;

const forgotPassword = css`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 45px;
    width: 100%;
    font-size: 12px;
    font-weight: 600;
`;

const loginButton = css`
    margin: 10px 0px;
    border: 1px solid #dbdbdb;
    border-radius: 7px;
    width: 100%;
    height: 50px;
    background-color: white;
    font-weight: 900;
    cursor: pointer;
    &:hover {
        background-color: #fafafa;
    }
    &:active {
        background-color: #eee;
    }
`;

const signupMessage = css`
    margin-top: 20px;
    font-size: 14px;
    font-weight: 600;
    color: #777;
`;

const register = css`
    margin-top: 10px;
    font-weight: 600;
`;

const Register = () => {
    return (
        <div css={container}>
            <header>
                <h1 css={logo}>SIGN UP</h1>
            </header>
            <main css={mainContainer}>
                <div css={authForm}>
                    <label css={inputLabel}>Email</label>
                    <LoginInput type="email" placeholder="Type your email">
                        <FiUser />
                    </LoginInput>
                    <label css={inputLabel}>Password</label>
                    <LoginInput type="password" placeholder="Type your password">
                        <FiLock />
                    </LoginInput>
                    <label css={inputLabel}>Name</label>
                    <LoginInput type="text" placeholder="Type your name">
                        <BiRename />
                    </LoginInput>
                    
                    <button css={loginButton}>REGISTER</button>
                </div>
            </main>

            <div css={signupMessage}>Already a user?</div>

            <footer>
                <div css={register}><Link to="/login">LOGIN</Link></div>
            </footer>
        </div>
    );
};

export default Register;