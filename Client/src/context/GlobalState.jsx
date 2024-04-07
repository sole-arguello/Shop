import { createContext } from 'react';
import ProductsApi from '../api/ProductsApi';


export const GlobalContext = createContext();

export const DataProvider = ({ children }) => {

    ProductsApi()
    return (
        <GlobalContext.Provider value={"value"}>
            {children}
        </GlobalContext.Provider>
    )
}

