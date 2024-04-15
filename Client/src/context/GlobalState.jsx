import { createContext, useEffect, useState } from 'react';
import ProductAPI from '../api/ProductAPI';
import UserAPI from '../api/UserAPI';
import axios from 'axios';
import CategoriesAPI from '../api/CategoriesAPI';



export const GlobalContext = createContext();


export const DataProvider = ({ children }) => {
    //console.log('children context', children)
    const [token, setToken] = useState(false) 
    const refreshToken = async () => {
        //console.log('token in global state refresh', token)
        try {
            const res = await axios.get('/api/user/refresh_token')
           // console.log('token in refresh', res.data)
            return setToken(res.data.accessToken)

        } catch (error) {
            console.log('error refresh global state', error)
        }
    }

    useEffect(() => {
        const firstLogin = localStorage.getItem('firstLogin')
        if(firstLogin) refreshToken()
    }, [])

    ProductAPI()
    console.log('Product Api in global state', ProductAPI())
    const state = {
        token: [token, setToken],
        productsApi: ProductAPI(),
        userApi: UserAPI(token),
        categoriesApi: CategoriesAPI(token)
    } 
    //console.log('estado', state)
    return (
        <GlobalContext.Provider value={state}>
            {children}
        </GlobalContext.Provider>
    )
}

