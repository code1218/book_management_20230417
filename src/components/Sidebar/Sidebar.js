/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React from 'react';

const sidebar = css`
    position: absolute;
    display: flex;
    flex-direction: column;
    border: 1px solid #dbdbdb;
    border-radius: 10px;
    padding: 10px;
    width: 250px;
    height: 500px;
    box-shadow: -1px 0px 5px #dbdbdb;
`;

const header = css`
    display: flex;
    align-items: center;
    margin-bottom: 15px;
`;

const userIcon = css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    border-radius: 8px;
    width: 45px;
    height: 45px;
    background-color: #713fff;
    color: white;
    font-size: 30px;
    font-weight: 600;
`;

const userInfo = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const userName = css`
    font-size: 18px;
    font-weight: 600;
    padding: 5px;
    padding-top: 0;
`;

const userEmail = css`
    font-size: 12px;
`;

const Sidebar = () => {
    return (
        <div css={sidebar}>
            <header css={header}>
                <div css={userIcon}>
                    b
                </div>
                <div css={userInfo}>
                    <h1 css={userName}>김준일</h1>
                    <p css={userEmail}>bbb@gmail.com</p>
                </div>
            </header>
            <main>
                <ul>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </main>
            <footer>
                <ul>
                    <li></li>
                </ul>
            </footer>
        </div>
    );
};

export default Sidebar;