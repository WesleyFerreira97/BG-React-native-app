import { useContext, createContext, useState } from "react";
import { theme as themeObj } from "../styles/theme";

type ChildrenProps = {
    children: React.ReactNode,
}

export type ThemeProps = {
    colors: {
        primary: string,
        primaryAlt: string,
        secondary: string,
        secondaryAlt: string,
        tertiary: string,
        neutral: string,
        neutralAlt: string,
    }
}

type ThemeContextProps = {
    theme: ThemeProps,
    setTheme: (value: ThemeProps) => void,
}

const initialValue = {
    theme: themeObj,
    setTheme: () => { }
}

const ThemeContext = createContext<ThemeContextProps>(initialValue);

export function ThemeContextProvider({ children }: ChildrenProps) {
    const [theme, setTheme] = useState<ThemeProps>(themeObj);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    const { theme, setTheme } = useContext(ThemeContext);

    return { theme, setTheme };
}