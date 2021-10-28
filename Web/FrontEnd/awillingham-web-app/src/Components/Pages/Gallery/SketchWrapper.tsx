import { SketchPreviewProps } from 'Components/Sketches/SketchTypes';
import React from 'react';
import { useTheme } from 'react-jss';
import { Theme } from 'Themes/BaseTheme';

export const getSketchWrapper = (component: React.ComponentType<SketchPreviewProps>): (() => JSX.Element) => {
    // eslint-disable-next-line react/display-name
    return (): JSX.Element => {
        const theme: Theme = useTheme();
        return React.createElement<SketchPreviewProps>(component, { theme: theme, width: 500, height: 500 });
    };
};
