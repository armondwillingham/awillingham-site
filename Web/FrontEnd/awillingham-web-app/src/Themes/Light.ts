import { BaseTheme, Theme } from './BaseTheme';

export const LightTheme: Theme = {
    ...BaseTheme,
    backgroundColor: {
        primary: '#e3e2df',
        secondary: 'black',
    },
    textColor: {
        primary: 'black',
        secondary: 'white',
    },
    darkModeButtonColor: '#9a9a9a',
};
