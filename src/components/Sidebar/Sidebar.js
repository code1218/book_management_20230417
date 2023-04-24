/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React from 'react';
import { GrFormClose } from 'react-icons/gr';
import ListButton from './ListButton/ListButton';
import { BiHome, BiLike, BiListUl, BiLogOut } from "react-icons/bi";

const sidebar = css`
    position: absolute;
    display: flex;
    flex-direction: column;
    border: 1px solid #dbdbdb;
    border-radius: 10px;
    width: 250px;
    box-shadow: -1px 0px 5px #dbdbdb;
`;

const header = css`
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    padding: 10px;
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

const closeButton = css`
    position: absolute;
    top: 10px;
    right: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #dbdbdb;
    padding-left: 0.3px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    font-size: 12px;
    cursor: pointer;
    &:active {
        background-color: #fafafa;
    }
`;

const main = css`
    padding: 10px;
    border-bottom: 1px solid #dbdbdb;
`;

const footer = css`
    padding: 10px;
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
                <div css={closeButton}><GrFormClose /></div>
            </header>
            <main css={main}>
                <ListButton title="Dashboard"><BiHome /></ListButton>
                <ListButton title="Likes"><BiLike /></ListButton>
                <ListButton title="Rental"><BiListUl /></ListButton>
            </main>
            <footer css={footer}>
                <ListButton title="Logout"><BiLogOut /></ListButton>
            </footer>
        </div>
    );
};

export default Sidebar;