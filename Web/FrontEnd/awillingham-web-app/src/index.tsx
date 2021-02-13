import { App } from 'App';
import React from 'react';
import { render as reactRender } from 'react-dom';

export const InitApp = (): void => {
    reactRender(<App />, document.getElementById('root'));
};

(window as any).InitApp = InitApp;
