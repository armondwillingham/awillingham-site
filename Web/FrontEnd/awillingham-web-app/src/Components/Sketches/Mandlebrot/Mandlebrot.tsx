import { Styles } from 'jss';
import P5 from 'p5';
import React, { useCallback, useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Theme } from 'Themes/BaseTheme';

import { hexToRgb } from 'Utils/HexToRgb';
import { SketchPreviewProps } from '../SketchTypes';

const MAX_ITER = 10;

interface TestSketchState {
    canvasRef: React.RefObject<HTMLDivElement>;
    p5Instance: P5 | undefined;
}

class Complex {
    re: number;
    im: number;

    constructor(re: number, im: number) {
        this.re = re;
        this.im = im;
    }

    abs(): number {
        return Math.sqrt(this.re * this.re + this.im * this.im);
    }

    square(): Complex {
        this.multiply(this.re, this.im);
        return this;
    }

    multiply(re: number, im: number): Complex {
        const k1 = re * (this.im + this.re);
        const k2 = this.re * (im - re);
        const k3 = this.im * (re + im);
        this.re = k1 - k3;
        this.im = k1 + k2;
        return this;
    }

    add(re: number, im: number): Complex {
        this.re += re;
        this.im += im;
        return this;
    }
}

interface MandlebrotSketchProps extends SketchPreviewProps {
    zoom: number;
}
export class MandlebrotSketch extends React.PureComponent<MandlebrotSketchProps, TestSketchState> {
    constructor(props: MandlebrotSketchProps) {
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
        let translateX = 0;
        let translateY = 0;
        let prevMouseX = 0;
        let prevMouseY = 0;

        p5.setup = (): void => {
            p5.createCanvas(W, H);
        };

        p5.draw = (): void => {
            const backgroundColor = hexToRgb(this.props.theme.backgroundColor.primary);
            p5.background(backgroundColor.r, backgroundColor.g, backgroundColor.b);
            p5.colorMode(p5.HSB);
            const zoom = this.props.zoom;
            for (let i = 0; i < W; ++i) {
                for (let j = 0; j < H; ++j) {
                    const x = p5.map(i + translateX * zoom, 0, W, -2 / zoom, 1 / zoom);
                    const y = p5.map(j + translateY * zoom, 0, H, -1.5 / zoom, 1.5 / zoom);
                    const mandlebrot = this.calculateMandlebrot(x, y);
                    const color = p5.map(mandlebrot, 1, MAX_ITER * zoom, 0, 255);
                    p5.set(i, j, p5.color(color, 100, 100));
                }
            }
            p5.updatePixels();
        };

        p5.touchStarted = (e: any): void => {
            let touchX = 0,
                touchY = 0;
            if (e.clientX && e.clientY) {
                touchX = e.clientX;
                touchY = e.clientY;
            } else if (e.touches[0].clientX && e.touches[0].clientY) {
                touchX = e.touches[0].clientX;
                touchY = e.touches[0].clientY;
            }
            if (touchX < 0 || touchX > W || touchY < 0 || touchY > H) {
                return;
            }
            prevMouseX = touchX;
            prevMouseY = touchY;
        };

        p5.touchMoved = (e: any): any => {
            let touchX = 0,
                touchY = 0;
            if (e.clientX && e.clientY) {
                touchX = e.clientX;
                touchY = e.clientY;
            } else if (e.touches[0].clientX && e.touches[0].clientY) {
                touchX = e.touches[0].clientX;
                touchY = e.touches[0].clientY;
            }
            if (touchX < 0 || touchX > W || touchY < 0 || touchY > H) {
                return;
            }
            const dx = (prevMouseX - touchX) / this.props.zoom;
            const dy = (prevMouseY - touchY) / this.props.zoom;
            translateX += dx;
            translateY += dy;
            prevMouseX = touchX;
            prevMouseY = touchY;
            return false;
        };
    };

    calculateMandlebrot(x: number, y: number): number {
        const z = new Complex(0, 0);
        let n = 0;
        while (z.abs() <= 2 && n < MAX_ITER * this.props.zoom) {
            z.square().add(x, y);
            ++n;
        }
        return n;
    }

    render(): JSX.Element {
        return <div ref={this.state.canvasRef} />;
    }
}

export const MandlebrotSketchComponent = (props: SketchPreviewProps): JSX.Element => {
    const styles = useStyles();
    const [zoom, setZoom] = useState(1);
    const [deltaZoom, setDeltaZoom] = useState(0);
    const [isZooming, setIsZooming] = useState(false);
    const size = Math.min(Math.min(window.innerWidth, window.innerHeight), 500);

    const startZoom = useCallback((amt: number) => {
        setIsZooming(true);
        setDeltaZoom(amt);
    }, []);

    const stopZoom = useCallback((): void => {
        setIsZooming(false);
    }, []);

    useEffect(() => {
        if (!isZooming) return;
        setZoom(zoom + deltaZoom);
    }, [isZooming, zoom, deltaZoom]);

    return (
        <div>
            <MandlebrotSketch {...props} width={size} height={size} zoom={zoom} />
            <button
                onMouseDown={() => startZoom(0.25)}
                onTouchStart={() => startZoom(0.25)}
                onMouseUp={() => stopZoom()}
                onTouchEnd={() => stopZoom()}
                className={styles.unselectable}
            >
                Zoom in
            </button>
            <button
                onMouseDown={() => startZoom(-0.25)}
                onTouchStart={() => startZoom(-0.25)}
                onMouseUp={() => stopZoom()}
                onTouchEnd={() => stopZoom()}
                className={styles.unselectable}
            >
                Zoom out
            </button>
            <div>Zoom: {zoom}</div>
        </div>
    );
};

export const MandlebrotPreview = (props: SketchPreviewProps): JSX.Element => {
    return <MandlebrotSketch {...props} zoom={1} />;
};

const useStyles = createUseStyles(
    (theme: Theme): Styles => ({
        unselectable: {
            '-webkit-user-select': 'none',
            '-moz-user-select': 'none',
            '-ms-user-select': 'none',
            userSelect: 'none',
        },
    }),
);
