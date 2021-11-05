import P5 from 'p5';
import React from 'react';
import { getScrollbarWidth } from 'Utils/GetScrollbarWidth';

import { color, hexToRgb } from 'Utils/HexToRgb';
import { SketchPreviewProps } from '../SketchTypes';

interface ChristmasSketchState {
    canvasRef: React.RefObject<HTMLDivElement>;
    p5Instance: P5 | undefined;
}

export class ChristmasSketch extends React.PureComponent<SketchPreviewProps, ChristmasSketchState> {
    constructor(props: SketchPreviewProps) {
        super(props);
        this.state = {
            canvasRef: React.createRef(),
            p5Instance: undefined,
        };
    }

    componentDidMount(): void {
        this.setState({
            ...this.state,
            p5Instance: new P5(this.sketch, this.state.canvasRef.current),
        });
    }

    sketch = (p5: P5): void => {
        const W = this.props.width;
        const H = this.props.height;

        p5.setup = (): void => {
            p5.createCanvas(W, H);
        };

        p5.draw = (): void => {
            const backgroundColor = hexToRgb(this.props.theme.backgroundColor.primary);
            p5.background(backgroundColor.r, backgroundColor.g, backgroundColor.b);
        };
    };

    render(): JSX.Element {
        return <div ref={this.state.canvasRef} />;
    }
}

export const ChristmasSketchComponent = (props: SketchPreviewProps): JSX.Element => {
    const W = window.innerWidth - getScrollbarWidth();
    const H = window.innerHeight;
    return <ChristmasSketch {...props} width={W} height={H} />;
};

export const ChristmasSketchPreview = (props: SketchPreviewProps): JSX.Element => {
    return <ChristmasSketch {...props} />;
};
