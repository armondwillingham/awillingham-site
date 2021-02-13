import React from 'react';
import { createUseStyles } from 'react-jss';

export const App = (): JSX.Element => {
    const styles = useStyles();

    return <div className={styles.style}>New world!</div>;
};

const useStyles = createUseStyles({
    style: {
        background: 'purple',
    },
});
