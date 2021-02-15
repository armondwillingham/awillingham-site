import React from 'react';
import { BasePage } from 'Components/Pages/BasePage';
import { WithToggleTheme } from 'Hooks/useTheme';

export const HomePage = (props: WithToggleTheme<any>): JSX.Element => {
    return (
        <BasePage toggleTheme={props.toggleTheme}>
            <div> Home </div>
        </BasePage>
    );
};
