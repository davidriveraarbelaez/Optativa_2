import React, { createContext, useState, FC, ReactNode} from 'react'

interface AppContextInterface {
    count: number;
    increase: () => void;
    decrease: () => void;
}

export const AppContext = createContext<AppContextInterface | null>(null)

interface AppProviderProps {
    children: ReactNode;
}

export const AppProvider: FC<AppProviderProps> = ({ children }) => {
    const [count, setCount] = useState(0)

    const increase = () => {
        setCount(count + 1)
    }

    const decrease = () => {
        setCount(count - 1)
    }

    return (
        <AppContext.Provider value={{ count, increase, decrease }}>
            {children}
        </AppContext.Provider>
    )
}