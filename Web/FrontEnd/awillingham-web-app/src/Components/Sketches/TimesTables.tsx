import P5 from 'p5';
import React from 'react';

import { hexToRgb, color } from 'Utils/HexToRgb';
import { SketchPreviewProps } from './SketchTypes';

interface TimesTableSketchProps extends SketchPreviewProps {
    table?: TimesTableInstance;
}

interface TimesTablesSketchState {
    canvasRef: React.RefObject<HTMLDivElement>;
    p5Instance: P5 | undefined;
}

export class TimesTablesSketch extends React.PureComponent<TimesTableSketchProps, TimesTablesSketchState> {
    constructor(props: TimesTableSketchProps) {
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
            const lineColor = hexToRgb(this.props.theme.textColor.primary);
            p5.background(backgroundColor.r, backgroundColor.g, backgroundColor.b);
            p5.translate(W / 2, H / 2);
            console.log(this.props.table);
            if (this.props.table) {
                const positions = this.drawOuterCircleAndGeneratePositions(p5, lineColor, this.props.table);
                this.drawLines(p5, lineColor, this.props.table, positions);
            }
        };
    };

    drawOuterCircleAndGeneratePositions = (p5: P5, color: color, table: TimesTableInstance): P5.Vector[] => {
        const result: P5.Vector[] = [];
        p5.noFill();
        p5.stroke(color.r, color.g, color.b);
        p5.strokeWeight(4);
        p5.circle(table.position.x, table.position.y, table.size);

        const dt = p5.TWO_PI / table.resolution;
        const r = table.size / 2;
        for (let t = 0; t < p5.TWO_PI; t += dt) {
            const pos = p5.createVector(p5.cos(t) * r, p5.sin(t) * r);
            p5.fill(color.r, color.g, color.b);
            p5.circle(pos.x, pos.y, 8);
            result.push(pos);
        }
        return result;
    };

    drawLines = (p5: P5, color: color, table: TimesTableInstance, positions: P5.Vector[]): void => {
        p5.stroke(color.r, color.g, color.b);
        p5.strokeWeight(1);
        for (let i = 0; i < table.resolution; ++i) {
            const from = positions[i];
            const to = positions[(i * table.factor) % table.resolution];
            p5.line(from.x, from.y, to.x, to.y);
        }
    };

    render(): JSX.Element {
        return <div ref={this.state.canvasRef} />;
    }
}

export const TimesTablesSketchComponent = (props: SketchPreviewProps): JSX.Element => {
    const basicTimesTable: TimesTableInstance = {
        position: new P5.Vector(),
        size: props.width,
        resolution: 100,
        factor: 2,
    };
    return <TimesTablesSketch {...props} table={basicTimesTable} />;
};

export const TimesTablesPreview = (props: SketchPreviewProps): JSX.Element => {
    const basicTimesTable: TimesTableInstance = {
        position: new P5.Vector(),
        size: props.width,
        resolution: 10,
        factor: 2,
    };
    return <TimesTablesSketch {...props} table={basicTimesTable} />;
};

interface TimesTableInstance {
    position: P5.Vector;
    size: number;
    resolution: number;
    factor: number;
}
