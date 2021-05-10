import { WithToggleTheme } from 'Hooks/useTheme';
import React from 'react';
import { BasePage } from './BasePage';

export const NotFound: React.FC<WithToggleTheme<any>> = ({ toggleTheme }: WithToggleTheme<any>) => {
    return (
        <BasePage toggleTheme={toggleTheme}>
            <div>404</div>
        </BasePage>
    );
};
