import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useQueries, useQuery } from 'react-query';
import axios from 'axios';
import { refreshState, refreshState2 } from '../../../atoms/Auth/AuthAtoms';
import { useRecoilState } from 'recoil';

const AuthRouteReactQuery = ({ path, element }) => {
    const [ refresh, setRefresh ] = useRecoilState(refreshState);
    const [ refresh2, setRefresh2 ] = useRecoilState(refreshState2);

    const { data, isLoading } = useQuery(["authenticated"], async () => {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.get("http://localhost:8080/auth/authenticated", {params: {accessToken}});
        return response;
    }, {
        enabled: refresh,
        onSuccess: (response) => {
            if(!!response.data){
                setRefresh2(true);
            }else {
                setRefresh2(false);
            }
        }
    });

    const principal = useQuery(["principal"], async () => {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.get("http://localhost:8080/auth/principal", {params: {accessToken}});
        return response;
    },{
        enabled: refresh2
    });

    useEffect(() => {
        if(!refresh) {
            setRefresh(true);
        }
    }, [refresh]);
    
    if(isLoading || principal.isLoading) {
        return (<div>로딩중...</div>);
    }
    console.log(principal.data)

    if(principal.data !== undefined) {
        const roles = principal.data.data.authorities.split(",");
        // const hasAdminPath = path.substr(0, 6) === "/admin";
        if(path.startsWith("/admin") && !roles.includes("ROLE_ADMIN")) {
            alert("접근 권한이 없습니다.");
            return <Navigate to="/" />;
        }
    }

    if(!isLoading) {
        const permitAll = ["/login", "/register", "/password/forgot"];
        
        if(!data.data) {
            if(permitAll.includes(path)){
                return element;
            }
            return <Navigate to="/login" />;
        }
        if(permitAll.includes(path)){
            return <Navigate to="/" />;
        }
        return element;
    }
};

export default AuthRouteReactQuery;