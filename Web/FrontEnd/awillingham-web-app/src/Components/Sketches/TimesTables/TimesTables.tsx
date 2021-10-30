import P5 from 'p5';
import React, { useState } from 'react';
import { createUseStyles, Styles } from 'react-jss';
import { TimesTablesControls } from './TimesTablesControls';
import { hexToRgb, color } from 'Utils/HexToRgb';
import { SketchPreviewProps } from '../SketchTypes';

interface TimesTableSketchProps extends SketchPreviewProps {
    tables?: TimesTableInstance[];
}

interface TimesTablesSketchState {
    canvasRef: React.RefObject<HTMLDivElement>;
    p5Instance: P5 | undefined;
}

export interface TimesTableInstance {
    name: string;
    position: P5.Vector;
    size: number;
    resolution: number;
    factor: number;
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
        const p5Instance = new P5(this.sketch, this.state.canvasRef.current);
        p5Instance.disableFriendlyErrors = true;
        this.setState({
            ...this.state,
            p5Instance,
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
            if (this.props.tables) {
                for (let i = 0; i < this.props.tables.length; ++i) {
                    const table = this.props.tables[i];
                    p5.push();
                    p5.translate(table.position.x, table.position.y);
                    if (this.positionArrs[i] && table.resolution === this.positionArrs[i].length) {
                        this.drawOuterCircle(p5, lineColor, table);
                    } else {
                        const positions = this.drawOuterCircleAndGeneratePositions(p5, lineColor, table);
                        this.positionArrs[i] = positions;
                    }
                    this.drawLines(p5, lineColor, table, this.positionArrs[i]);
                    p5.pop();
                }
            }
        };
    };

    drawOuterCircleAndGeneratePositions = (p5: P5, color: color, table: TimesTableInstance): P5.Vector[] => {
        const result: P5.Vector[] = [];
        p5.noFill();
        p5.stroke(color.r, color.g, color.b);
        p5.strokeWeight(4);
        p5.circle(0, 0, table.size);

        const dt = p5.TWO_PI / table.resolution;
        const r = table.size / 2;
        for (let t = 0; t < p5.TWO_PI; t += dt) {
            const pos = p5.createVector(Math.cos(t) * r, Math.sin(t) * r);
            result.push(pos);
        }
        return result;
    };

    drawOuterCircle = (p5: P5, color: color, table: TimesTableInstance): void => {
        p5.noFill();
        p5.stroke(color.r, color.g, color.b);
        p5.strokeWeight(4);
        p5.circle(0, 0, table.size);
    };

    drawLines = (p5: P5, color: color, table: TimesTableInstance, positions: P5.Vector[]): void => {
        p5.stroke(color.r, color.g, color.b);
        p5.strokeWeight(1);
        p5.beginShape(p5.LINES);
        if (Number.isSafeInteger(table.factor)) {
            for (let i = 0; i < table.resolution; ++i) {
                const from = positions[i];
                const to = positions[(i * table.factor) % table.resolution];
                p5.vertex(from.x, from.y);
                p5.vertex(to.x, to.y);
            }
        } else {
            for (let i = 0; i < table.resolution; ++i) {
                const from = positions[i];
                const theta = ((i * table.factor) / table.resolution) * p5.TWO_PI;
                const toX = (Math.cos(theta) * table.size) / 2;
                const toY = (Math.sin(theta) * table.size) / 2;
                p5.vertex(from.x, from.y);
                p5.vertex(toX, toY);
            }
            table.factor += 0.01;
        }
        p5.endShape();
    };

    render(): JSX.Element {
        return <div ref={this.state.canvasRef} />;
    }

    positionArrs: P5.Vector[][] = [];
}

export const TimesTablesSketchComponent = (props: SketchPreviewProps): JSX.Element => {
    const [timesTables, setTimesTables] = useState<TimesTableInstance[]>([]);
    const styles = useStyles();
    const W = window.innerWidth - 16;
    const H = window.innerHeight - 48;
    return (
        <div className={styles.sketchContainer}>
            <TimesTablesSketch {...props} width={W} height={H} tables={timesTables} />
            <TimesTablesControls timesTables={timesTables} setTimesTables={setTimesTables} width={W} height={H} />
        </div>
    );
};

export const TimesTablesPreview = (props: SketchPreviewProps): JSX.Element => {
    const basicTimesTable: TimesTableInstance = {
        position: new P5.Vector(),
        size: props.width,
        resolution: 10,
        factor: 2,
        name: 'Preview',
    };
    return <TimesTablesSketch {...props} tables={[basicTimesTable]} />;
};

const useStyles = createUseStyles(
    (): Styles => ({
        sketchContainer: {
            display: 'flex',
            flexWrap: 'wrap',
        },
    }),
);
