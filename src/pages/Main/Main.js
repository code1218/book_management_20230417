/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import axios from 'axios';
import React from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import Sidebar from '../../components/Sidebar/Sidebar';
import BookCard from '../../components/UI/BookCard/BookCard';

const mainContainer = css`
    padding: 10px;
`;
const header = css`
    display: flex;
    justify-content: space-between;
    padding: 40px;
    height: 100px;
`;
const title = css`
    font-size: 35px;
    font-weight: 600;
`;
const searchItems = css`
    display: flex;
    justify-content: space-between;
    padding: 10px;
`;
const categoryGroup = css`
    display: flex;
    flex-wrap: wrap;
    max-width: 250px;
    padding: 10px;
`;
const searchInput = css`
    border: 1px solid #dbdbdb;
    border-radius: 7px;
    padding: 5px;
    width: 150px;
    height: 30px;
`
const main = css`
    display: flex;
    flex-wrap: wrap;
    height: 750px;
    overflow-y: auto;
`;

const Main = () => {
    const [ searchParam, setSearchParam ] = useState({page: 1, searchValue: "", categoryId: 0});
    const [ refresh, setRefresh ] = useState(false);
    const [ books, setBooks ] = useState([]);
    const [ lastPage, setLastPage ] = useState(1);
    const lastBookRef = useRef();

    useEffect(() => {
        const observerService = (entries, observer) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    setRefresh(true);
                }
            });
        }

        const observer = new IntersectionObserver(observerService, {threshold: 1});
        observer.observe(lastBookRef.current);
    }, []);

    const option = {
        params: searchParam,
        headers: {
            Authorization: localStorage.getItem("accessToken")
        }
    }
    const searchBooks = useQuery(["searchBooks"], async () => {
        const response = await axios.get("http://localhost:8080/books", option);
        return response;
    }, {
        onSuccess: (response) => {
            if(refresh) {
                setRefresh(false);
            }
            console.log(response);
            const totalCount = response.data.totalCount;
            setLastPage(totalCount % 20 === 0 ? totalCount / 20 : Math.ceil(totalCount / 20));
            setBooks([...books, ...response.data.bookList]);
            setSearchParam({...searchParam, page: searchParam.page + 1});
        },
        enabled: refresh && searchParam.page < lastPage + 1
    });

    const categories = useQuery(["categories"], async () => {
        const option = {
            headers: {
                Authorization: localStorage.getItem("accessToken")
            }
        }
        const response = await axios.get("http://localhost:8080/categories", option);
        return response;
    })

    return (
        <div css={mainContainer}>
            <Sidebar></Sidebar>
            <header css={header}>
                <div css={title}>도서검색</div>
                <div css={searchItems}>
                    <div css={categoryGroup}>

                    </div>
                    <input css={searchInput} type="search" />
                </div>
            </header>
            <main css={main}>
                {books.length > 0 ? books.map(book => (<BookCard key={book.bookId} book={book}></BookCard>)) : ""}
                <div ref={lastBookRef}></div>
            </main>
        </div>
    );
};

export default Main;