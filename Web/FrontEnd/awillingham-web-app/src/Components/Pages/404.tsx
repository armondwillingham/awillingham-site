import { WithToggleTheme } from 'Hooks/useTheme';
import React from 'react';
import { BasePage } from './BasePage';

export const NotFound = ({ toggleTheme }: WithToggleTheme<any>): JSX.Element => {
    return (
        <BasePage toggleTheme={toggleTheme}>
            <div>404</div>
        </BasePage>
    );
};
