import React from 'react';
import { Styles, createUseStyles } from 'react-jss';
import { Theme } from 'Themes/BaseTheme';

export const Footer = (): JSX.Element => {
    const styles = useStyles();

    return <footer className={styles.footer}>Footer</footer>;
};

const useStyles = createUseStyles(
    (theme: Theme): Styles => ({
        footer: {
            backgroundColor: theme.backgroundColor.primary,
            color: theme.textColor.primary,
        },
    }),
);
