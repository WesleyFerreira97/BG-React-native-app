import * as React from 'react';
import { configureFonts, DefaultTheme, Provider } from 'react-native-paper';
import App from '../../App';

type PaperProviderProps = {
    children: React.ReactNode | null,
}

const fontStyles = {
    regular: {
        fontFamily: 'Poppins',
    },
    medium: {
        fontFamily: 'Poppins',
    },
    light: {
        fontFamily: 'Poppins',
    },
    thin: {
        fontFamily: 'Poppins',
    },
}

const fontConfig = {
    web: fontStyles,
    ios: fontStyles,
    android: fontStyles,
};

const theme = {
    ...DefaultTheme,
    fonts: configureFonts(fontConfig),
};

export function PaperProvider({ children }: PaperProviderProps) {
    return (
        <Provider theme={theme}>
            {children}
        </Provider>
    );
}