import { WithToggleTheme } from 'Hooks/useTheme';
import React from 'react';
import { createUseStyles, Styles, useTheme } from 'react-jss';
import { Theme } from 'Themes/BaseTheme';

export const ToggleThemeButton = ({ toggleTheme }: WithToggleTheme<any>): JSX.Element => {
    const theme: Theme = useTheme();
    const styles = useStyles();
    return (
        <svg className={styles.button} width="30px" height="30px" onClick={toggleTheme}>
            <g transform="scale(.75)">
                <path
                    className={styles.icon}
                    style={{ fill: theme.darkModeButtonColor }}
                    d="M17.9,40c-0.5-0.1-1-0.1-1.6-0.2c-2.5-0.3-4.8-1-7-2.1C7,36.5,5,35,3.3,33.1c-1.3-1.4-2.4-3-3.2-4.7
                        c0-0.1-0.1-0.1-0.1-0.2c0,0,0,0,0-0.1c0.5,0.3,1.1,0.7,1.6,1c1.8,1.1,3.7,1.8,5.8,2.3c3.3,0.7,6.5,0.5,9.7-0.5
                        c2.5-0.8,4.7-2.1,6.6-3.8c2-1.8,3.6-4,4.5-6.6c1-2.5,1.3-5.1,1-7.7c-0.3-2.9-1.3-5.6-3-8C25,3,23.4,1.5,21.6,0.3
                        c-0.1-0.1-0.2-0.2-0.4-0.3c0.1,0,0.2,0,0.3,0c0.1,0,0.3,0.1,0.4,0.1c2.7,0.3,5.2,1.2,7.5,2.4c2.1,1.1,3.9,2.6,5.5,4.3
                        c1.9,2.1,3.3,4.4,4.1,7c0.9,2.6,1.2,5.2,0.9,7.9c-0.3,3.5-1.5,6.6-3.5,9.5c-1.8,2.5-4.1,4.6-6.9,6.1c-2.4,1.3-4.9,2.2-7.7,2.5
                        c-0.5,0.1-1,0.1-1.5,0.2C19.5,40,18.7,40,17.9,40z"
                />
            </g>
        </svg>
    );
};

const useStyles = createUseStyles({
    button: {
        marginLeft: 'auto',
    },
    icon: {
        transitionProperty: 'all',
        transitionDuration: '.5s',
    },
});
