import { Styles } from 'jss';
import React from 'react';
import { createUseStyles } from 'react-jss';
import { Theme } from 'Themes/BaseTheme';

export const EmptyTimeTableOptions = (): JSX.Element => {
    const styles = useStyles();

    return <div>Choose one of the times tables, or create a new one.</div>;
};

const useStyles = createUseStyles(
    (theme: Theme): Styles => ({
        footer: {
            backgroundColor: theme.backgroundColor.primary,
            color: theme.textColor.primary,
        },
    }),
);
