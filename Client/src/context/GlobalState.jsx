import { createContext } from 'react';


export const GlobalContext = createContext();

export const DataProvider = ({ children }) => {
    return (
        <GlobalContext.Provider value={"value"}>
            {children}
        </GlobalContext.Provider>
    )
}

