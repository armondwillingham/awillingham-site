import { BaseTheme, Theme } from './BaseTheme';

export const DarkTheme: Theme = {
    ...BaseTheme,
    backgroundColor: {
        primary: '#000000',
        secondary: '#000000',
    },
    textColor: {
        primary: '#ffffff',
        secondary: '#ffffff',
    },
    darkModeButtonColor: 'white',
};
