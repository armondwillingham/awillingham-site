import React from 'react';
import { useTheme } from 'Hooks/useTheme';
import { ThemeProvider } from 'react-jss';
import { Routes } from 'Components/Pages/Routes';
import { RouteList } from 'Components/Pages/RouteList';
import { BrowserRouter as Router } from 'react-router-dom';

export const App: React.FC = (): JSX.Element => {
    const [theme, toggleTheme] = useTheme();

    return (
        <ThemeProvider theme={theme}>
            <Router>
                <RouteList routes={Routes} toggleTheme={toggleTheme} />
            </Router>
        </ThemeProvider>
    );
};
