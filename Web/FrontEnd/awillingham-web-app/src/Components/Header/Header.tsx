import React from 'react';
import { Styles, createUseStyles } from 'react-jss';
import { NavLink } from 'react-router-dom';
import { Theme } from 'Themes/BaseTheme';
import { AWLogo } from './AWLogo';
import { ToggleThemeButton } from './ToggleThemeButton';

interface HeaderProps {
    toggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
    const styles = useStyles();

    return (
        <header className={styles.header}>
            <NavLink to={'/'} className={styles.navLink}>
                <AWLogo />
                <span className={styles.home}>Home</span>
            </NavLink>
            <NavLink to={'/gallery'} className={styles.navLink}>
                <span className={styles.home}>Gallery</span>
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
            fontFamily: theme.fonts.rubik,
        },
        navLink: {
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            color: theme.textColor.secondary,
            fontSize: '1.5rem',
            fontWeight: '500',
            paddingLeft: '1rem',
        },
        home: {
            paddingLeft: '.5rem',
        },
    }),
);
