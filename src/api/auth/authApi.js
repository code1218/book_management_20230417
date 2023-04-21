import axios from "axios"

export const getAuthenticated = (accessToken) => {
    console.log(accessToken)
    return axios.get("http://localhost:8080/auth/authenticated", {params: {accessToken}});
}