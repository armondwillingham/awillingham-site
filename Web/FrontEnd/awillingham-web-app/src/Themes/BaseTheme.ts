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
}

export const BaseTheme: Partial<Theme> = {
    backgroundColor: {
        primary: 'white',
        secondary: 'black',
    },
    textColor: {
        primary: 'black',
        secondary: 'white',
    },
};
