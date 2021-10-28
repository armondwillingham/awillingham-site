import P5 from 'p5';
import React from 'react';

import { hexToRgb } from 'Utils/HexToRgb';
import { SketchPreviewProps } from './SketchTypes';

interface TestSketchState {
    canvasRef: React.RefObject<HTMLDivElement>;
    p5Instance: P5 | undefined;
}
export class TestSketch extends React.PureComponent<SketchPreviewProps, TestSketchState> {
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
        let x = 0;
        p5.setup = (): void => {
            p5.createCanvas(W, H);
        };

        p5.draw = (): void => {
            const backgroundColor = hexToRgb(this.props.theme.backgroundColor.primary);
            p5.background(backgroundColor.r, backgroundColor.g, backgroundColor.b);
            p5.fill(255);
            p5.circle((x += 0.01), 10, 10);
        };
    };

    render(): JSX.Element {
        return <div ref={this.state.canvasRef} />;
    }
}

export const TestSketchPreview = (props: SketchPreviewProps): JSX.Element => {
    return <TestSketch {...props} />;
};
