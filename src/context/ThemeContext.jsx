import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();
const ThemeUpdateContext = createContext();

export function useTheme() {
    return useContext(ThemeContext);
}

export function useThemeUpdate() {
    return useContext(ThemeUpdateContext);
}

export function ThemeProvider({ children }) {
    const [darkTheme, setDarkTheme] = useState(() => {
        const saved = localStorage.getItem("darkTheme");
        return saved ? JSON.parse(saved) : false;
    });

    function toggleTheme() {
        setDarkTheme(prev => !prev);
    }

    useEffect(() => {
        localStorage.setItem("darkTheme", JSON.stringify(darkTheme));
        const body = document.body;
        if (darkTheme) {
            body.classList.add("dark-theme");
            body.classList.remove("light-theme");
        } else {
            body.classList.add("light-theme");
            body.classList.remove("dark-theme");
        }
    }, [darkTheme]);

    return (
        <ThemeContext.Provider value={darkTheme}>
            <ThemeUpdateContext.Provider value={toggleTheme}>
                {children}
            </ThemeUpdateContext.Provider>
        </ThemeContext.Provider>
    );
}