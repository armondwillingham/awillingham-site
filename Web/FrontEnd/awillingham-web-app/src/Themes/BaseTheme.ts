export interface Theme {
    backgroundColor: {
        primary: string;
        secondary: string;
    };
    textColor: {
        primary: string;
        secondary: string;
    };
    darkModeButtonColor: string;
    fonts: {
        rubik: string;
    };
}

export const BaseTheme = {
    backgroundColor: {
        primary: '#ffffff',
        secondary: '#000000',
    },
    textColor: {
        primary: '#000000',
        secondary: '#ffffff',
    },
    fonts: {
        rubik: "'Rubik', sans-serif;",
    },
};
