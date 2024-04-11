import { createContext, useEffect, useState } from 'react';
import ProductAPI from '../api/ProductAPI';
import UserAPI from '../api/UserAPI';
export const GlobalContext = createContext();
import axios from 'axios';

export const DataProvider = ({ children }) => {
    const [token, setToken] = useState(false)
    const refreshToken = async () => {
        console.log('token in global state refresh', token)
        try {
            const res = await axios.get('/api/user/refresh_token')
            console.log('token in refresh', res.data)
            setToken(res.data.accessToken)
        //     setTimeout(() => {
        //         refreshToken()
        //     }, 10 * 60 * 1000) 
        } catch (error) {
            console.log('error refresh global state', error)
        }
    }

    useEffect(() => {
        const firstLogin = localStorage.getItem('firstLogin')
        //console.log('firstLogin', firstLogin)
        if(firstLogin) refreshToken()
    }, [])

    ProductAPI()

    const state = {
        token: [token, setToken],
        productsApi: ProductAPI(),
        userApi: UserAPI(token)
    } 
    //console.log('estado', state)
    return (
        <GlobalContext.Provider value={state}>
            {children}
        </GlobalContext.Provider>
    )
}

