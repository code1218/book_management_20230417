/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import axios from 'axios';
import React, { useRef, useState } from 'react';
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
    height: 100px;
`;
const main = css`
    display: flex;
    flex-wrap: wrap;
    height: 750px;
    overflow-y: auto;
`;

const Main = () => {
    const [ searchParam, setSearchParam ] = useState({
        page: 1
    });
    const [ books, setBooks ] = useState([]);
    const [ refresh, setRefresh ] = useState(false);
    const lastPage = useRef();
    const searchBooks = useQuery(["searchBooks"], async () => {
        const response = await axios.get("http://localhost:8080/books", {params: {...searchParam}});
        return response;
    }, {
        enabled: refresh,
        onSuccess: (response) => {
            if(refresh) {
                setRefresh(false);
            }
            setBooks([...books, ...response.data]);
            setSearchParam({...searchParam, page: searchParam.page + 1});
        }
    });

    useEffect(() => {
        
        const io = new IntersectionObserver((entries, io) => {
            entries.forEach(
                async (entry) => {
                    console.log(entry)
                    if(entry.isIntersecting) {
                        io.unobserve(entry.target);
                        setRefresh(true);
                    }
                    
                }
            )
            
        }, { threshold: 0.7 });
        io.observe(lastPage.current);
    }, [books]);

    return (
        <div css={mainContainer}>
            <Sidebar></Sidebar>
            <header css={header}>
                <div>도서검색</div>
                <div>
                    <input type="search" />
                </div>
            </header>
            <main css={main}>
                {books?.map(book => {
                        return (<BookCard key={book?.bookId} book={book}></BookCard>);
                    })}
                <div ref={lastPage}></div>
            </main>
            
        </div>
    );
};

export default Main;