import { Footer } from 'Components/Footer/Footer';
import { Header } from 'Components/Header/Header';
import React from 'react';
import { createUseStyles, Styles } from 'react-jss';
import { Theme } from 'Themes/BaseTheme';

interface BasePageProps {
    toggleTheme: () => void;
    children: React.ReactNode;
}

export const BasePage: React.FC<BasePageProps> = (props: BasePageProps) => {
    const styles = useStyles();

    return (
        <>
            <Header toggleTheme={props.toggleTheme} />
            <div className={styles.container}>{props.children}</div>
            {/* <Footer /> */}
        </>
    );
};

const useStyles = createUseStyles(
    (theme: Theme): Styles => ({
        container: {
            backgroundColor: theme.backgroundColor.primary,
            color: theme.textColor.primary,
            marginTop: '3rem',
            height: '100%',
        },
    }),
);
