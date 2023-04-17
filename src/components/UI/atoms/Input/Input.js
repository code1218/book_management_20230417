/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React from 'react';

const inputBox = css`
    border-bottom: 1px solid #dbdbdb;
    padding: 5px 10px 5px 50px;
    width: 100%;
    height: 40px;
`;

const Input = ({ type }) => {
    return (
        <div css={inputBox}>
            <input type="{type}" />
        </div>
    );
};

export default Input;