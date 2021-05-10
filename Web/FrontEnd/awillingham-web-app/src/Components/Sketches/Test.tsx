import React, { useCallback } from 'react';
import Sketch from 'react-p5';
import p5Types from 'p5'; //Import this for typechecking and intellisense
import { Theme } from 'Themes/BaseTheme';
import { useTheme } from 'react-jss';

export const Test: React.FC = () => {
    const theme: Theme = useTheme();
    let x = 50;
    const y = 50;
    console.log('render');
    //See annotations in JS for more information
    const setup = (p5: p5Types, canvasParentRef: Element) => {
        p5.createCanvas(500, 500).parent(canvasParentRef);
    };

    const draw = useCallback(
        (p5: p5Types) => {
            p5.background(theme.backgroundColor.primary);
            p5.ellipse(x, y, 70, 70);
            x++;
        },
        [theme],
    );

    return <MemoSketch setup={setup} draw={draw} />;
};
const MemoSketch = React.memo(Sketch, () => true);
export const TestPreview = Test;
