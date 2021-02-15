import { BaseTheme, Theme } from './BaseTheme';

export const DarkTheme: Theme = {
    ...BaseTheme,
    backgroundColor: {
        primary: 'black',
        secondary: 'black',
    },
    textColor: {
        primary: 'white',
        secondary: 'white',
    },
    darkModeButtonColor: 'white',
};
