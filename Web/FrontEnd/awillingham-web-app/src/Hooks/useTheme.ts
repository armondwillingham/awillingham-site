import { useState } from 'react';
import { Theme } from 'Themes/BaseTheme';
import { DarkTheme } from 'Themes/Dark';
import { LightTheme } from 'Themes/Light';

export type WithToggleTheme<T> = T & { toggleTheme: () => void };

export const useTheme = (): [Theme, () => void] => {
    const savedTheme = window.localStorage.getItem('theme');
    const startingTheme = savedTheme && savedTheme === 'light' ? LightTheme : DarkTheme;
    const [theme, setTheme] = useState(startingTheme);

    const toggleTheme = () => {
        if (theme === LightTheme) {
            window.localStorage.setItem('theme', 'dark');
            setTheme(DarkTheme);
        } else {
            window.localStorage.setItem('theme', 'light');
            setTheme(LightTheme);
        }
    };

    return [theme, toggleTheme];
};
