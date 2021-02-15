import React from 'react';
import { Styles, createUseStyles } from 'react-jss';
import { NavLink } from 'react-router-dom';
import { Theme } from 'Themes/BaseTheme';
import { AWLogo } from './AWLogo';
import { ToggleThemeButton } from './ToggleThemeButton';

interface HeaderProps {
    toggleTheme: () => void;
}

export const Header = (props: HeaderProps): JSX.Element => {
    const styles = useStyles();

    return (
        <header className={styles.header}>
            <NavLink to={'/'} className={styles.navLink}>
                <AWLogo />
                <span>Home</span>
            </NavLink>
            <ToggleThemeButton toggleTheme={props.toggleTheme} />
        </header>
    );
};

const useStyles = createUseStyles(
    (theme: Theme): Styles => ({
        header: {
            display: 'flex',
            alignItems: 'center',
            backgroundColor: theme.backgroundColor.secondary,
            color: theme.textColor.secondary,
            padding: '0 1rem',
            position: 'fixed',
            left: 0,
            top: 0,
            width: 'calc(100% - 2rem)',
            height: '3rem',
        },
        navLink: {
            textDecoration: 'none',
            color: theme.textColor.secondary,
            fontSize: '18px',
        },
    }),
);
