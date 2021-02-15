import React from 'react';
import { render } from 'react-dom';
import { App } from 'App';

export const InitApp = (): void => {
    render(<App />, document.getElementById('root'));
};

(window as any).InitApp = InitApp;
