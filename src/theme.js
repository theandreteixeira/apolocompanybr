import { extendTheme } from "@chakra-ui/react";

const config = {
    initialColorMode: 'light',
    useSystemColorMode: false,
};

const breakpoints = {
    sm: '320px',
    md: '768px',
    lg: '960px',
    xl: '1200px',
    '2xl': '1536px',
};

const styles = {
    global: {
        body: {
            fontFamily: "'Roboto', sans-serif",
        },
    },
};

const Input = {
    defaultProps: {
        focusBorderColor: 'black',
        borderRadius: 0
    },
};

export const theme = extendTheme({
    radii: {
        base: '0',
    },
    breakpoints,
    config,
    // styles,
    styles,
    components: { Input }
});