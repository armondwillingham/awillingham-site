import P5 from 'p5';
import React from 'react';
import { getScrollbarWidth } from 'Utils/GetScrollbarWidth';

import { color, hexToRgb } from 'Utils/HexToRgb';
import { SketchPreviewProps } from '../SketchTypes';

interface SnowflakeSketchState {
    canvasRef: React.RefObject<HTMLDivElement>;
    p5Instance: P5 | undefined;
}

class Snowflake {
    nodes: boolean[][];
    size: number;

    constructor(nodes: number, size: number) {
        this.size = size;
        this.nodes = [];
        for (let i = 0; i < nodes; ++i) {
            this.nodes[i] = new Array<boolean>(nodes);
        }
    }

    draw(p5: P5) {
        const nodeSize = this.size / (this.nodes.length + 1);
    }
}

export class SnowflakeSketch extends React.PureComponent<SketchPreviewProps, SnowflakeSketchState> {
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

export const SnowflakeSketchComponent = (props: SketchPreviewProps): JSX.Element => {
    const W = window.innerWidth - getScrollbarWidth();
    const H = window.innerHeight;
    return <SnowflakeSketch {...props} width={W} height={H} />;
};

export const SnowflakeSketchPreview = (props: SketchPreviewProps): JSX.Element => {
    return <SnowflakeSketch {...props} />;
};
