/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import axios from 'axios';
import React, { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { useMutation, useQuery, useQueryClient } from 'react-query';

const tableContainer = css`
    height: 300px;
    overflow: auto;
`;

const table = css`
    border: 1px solid #dbdbdb;
    font-size: 12px;
`;

const thAndTd = css`
    border: 1px solid #dbdbdb;
    padding: 5px 10px;
    text-align: center;
`;

const BookRegister = () => {
    const queryClient = useQueryClient();
    
    const [ searchParams, setSearchParams ] = useState({page: 1, searchValue: ""});
    const [ refresh, setRefresh ] = useState(true); 

    const getBooks = useQuery(["registerSearchBooks"], async ()=> {
        const option = {
            params: {
                ...searchParams
            },
            headers: {
                Authorization: localStorage.getItem("accessToken")
            }
        }
        return await axios.get("http://localhost:8080/books", option);
    }, {
        enabled: refresh,
        onSuccess: () => {
            setRefresh(false);
        }
    });

    const registeBookList = useMutation();

    const searchInputHandle = (e) => {
        setSearchParams({...searchParams, searchValue: e.target.value});

    }

    const searchSubmitHandle = (e) => {
        if(e.type !== "click") {
            if(e.keyCode !== 13) {
                return;
            }
        }
        setSearchParams({...searchParams, page: 1});
        setRefresh(true);
    }

    const pagination = () => {
        if(getBooks.isLoading) {
            return (<></>);
        }

        const nowPage = searchParams.page;

        const lastPage = getBooks.data.data.totalCount % 20 === 0 
            ? getBooks.data.data.totalCount / 20
            : Math.floor(getBooks.data.data.totalCount / 20) + 1;
        
        const startIndex = nowPage % 5 === 0 ? nowPage - 4 : nowPage - (nowPage % 5) + 1;
        const endIndex = startIndex + 4 <= lastPage ? startIndex + 4 : lastPage;

        const pageNumbers = [];

        for(let i = startIndex; i <= endIndex; i++) {
            pageNumbers.push(i);
        }

        return (
            <>
                {pageNumbers.map(page => (<button onClick={() => {
                    setSearchParams({...searchParams, page});
                    setRefresh(true);
                }}>{page}</button>))}
            </>
        )
    }

    return (
        <div>
            <div>
                <label>도서검색</label>
                <input type="text" onChange={searchInputHandle} onKeyUp={searchSubmitHandle}/>
                <button onClick={searchSubmitHandle}><BiSearch /></button>
            </div>
            <div css={tableContainer}>
                <table css={table}>
                    <thead>
                        <tr>
                            <th css={thAndTd}>선택</th>
                            <th css={thAndTd}>분류</th>
                            <th css={thAndTd}>도서명</th>
                            <th css={thAndTd}>저자명</th>
                            <th css={thAndTd}>출판사</th>
                        </tr>
                    </thead>
                    <tbody>
                        {getBooks.isLoading ? "" : getBooks.data.data.bookList.map(book => (
                            <tr key={book.bookId}>
                                <td css={thAndTd}><input type="radio" name='select' value={book.bookId}/></td>
                                <td css={thAndTd}>{book.categoryName}</td>
                                <td css={thAndTd}>{book.bookName}</td>
                                <td css={thAndTd}>{book.authorName}</td>
                                <td css={thAndTd}>{book.publisherName}</td>
                            </tr>)
                        )}
                    </tbody>
                </table>
            </div>
            <div>
                <button>&#60;</button>
                {pagination()}
                <button>&#62;</button>
            </div>
            <div>
                <label>도서코드</label>
                <input type="text" readOnly/>
            </div>
            <div>
                <label>분류</label>
                <input type="text" readOnly/>
            </div>
            <div>
                <label>도서명</label>
                <input type="text" readOnly/>
            </div>
            <div>
                <label>저자</label>
                <input type="text" readOnly/>
            </div>
            <div>
                <label>출판사</label>
                <input type="text" readOnly/>
            </div>
            <div>
                <label>이미지 경로</label>
                <input type="text" readOnly/>
            </div>
            <button>등록</button>
        </div>
    );
};

export default BookRegister;