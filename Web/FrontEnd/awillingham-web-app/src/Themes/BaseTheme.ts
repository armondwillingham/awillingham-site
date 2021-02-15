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
        primary: 'white',
        secondary: 'black',
    },
    textColor: {
        primary: 'black',
        secondary: 'white',
    },
    fonts: {
        rubik: "'Rubik', sans-serif;",
    },
};
