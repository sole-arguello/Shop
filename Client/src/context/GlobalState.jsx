import { createContext, useEffect, useState } from 'react';
import ProductAPI from '../api/ProductAPI';
export const GlobalContext = createContext();
import axios from 'axios';

export const DataProvider = ({ children }) => {
    const [token, setToken] = useState(false)
    const refreshToken = async () => {
        const res = await axios.get('/api/user/refresh_token')
        //console.log('token', token)
        setToken(res.data.accessToken)
    //     setTimeout(() => {
    //         refreshToken()
    //     }, 10 * 60 * 1000)
    }

    useEffect(() => {
        const firstLogin = localStorage.getItem('firstLogin')
        console.log('firstLogin', firstLogin)
        if(firstLogin) refreshToken()
    }, [])

    ProductAPI()

    const state = {
        token: [token, setToken],
        productsApi: ProductAPI()
    } 
    //console.log('estado', state)
    return (
        <GlobalContext.Provider value={state}>
            {children}
        </GlobalContext.Provider>
    )
}

