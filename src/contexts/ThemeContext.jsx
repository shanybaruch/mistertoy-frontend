import { createContext, useState } from "react";

export const ThemeContext = createContext()


export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('')

    function toggleTheme() {
        setTheme(theme => theme ? '' : 'dark')
    }

    return (
        <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )


}