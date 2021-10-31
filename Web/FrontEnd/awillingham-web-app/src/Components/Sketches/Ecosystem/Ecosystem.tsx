import { apply, fix } from 'mathjs';
import P5 from 'p5';
import React from 'react';
import { getScrollbarWidth } from 'Utils/GetScrollbarWidth';

import { color, hexToRgb } from 'Utils/HexToRgb';
import { SketchPreviewProps } from '../SketchTypes';

interface EcosystemSketchState {
    canvasRef: React.RefObject<HTMLDivElement>;
    p5Instance: P5 | undefined;
}

interface Food {
    x: number;
    y: number;
    rad: number;
}

class Particle {
    x: number;
    y: number;
    xVel: number;
    yVel: number;
    maxX: number;
    maxY: number;
    color: color;
    hp: number;
    segments: { x: number; y: number }[];

    constructor(x: number, y: number, maxX: number, maxY: number) {
        this.x = x;
        this.y = y;
        this.maxX = maxX;
        this.maxY = maxY;
        this.xVel = 0;
        this.yVel = 0;
        this.color = {
            r: Math.random() * 255,
            g: Math.random() * 255,
            b: Math.random() * 255,
        };
        this.hp = 100;
        this.segments = [];
    }

    applyForce(x: number, y: number) {
        this.xVel += x;
        this.yVel += y;
    }

    lookForFood(p5: P5, food: Food[]): number {
        for (let i = 0; i < food.length; ++i) {
            const f = food[i];
            const dx = f.x - this.x;
            const dy = f.y - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < f.rad) {
                this.hp += f.rad * 3;
                return i;
            } else if (dist < 100) {
                this.applyForce(p5.constrain(dx / (dist * 2), -2, 2), p5.constrain(dy / (dist * 2), -2, 2));
            }
        }
        return -1;
    }

    update() {
        this.x += this.xVel;
        this.y += this.yVel;
        if (this.x < 0) {
            this.x = this.maxX - this.x;
            this.segments = [];
        } else if (this.x > this.maxX) {
            this.x = this.x - this.maxX;
            this.segments = [];
        }
        if (this.y < 0) {
            this.y = this.maxY - this.y;
            this.segments = [];
        } else if (this.y > this.maxY) {
            this.y = this.y - this.maxY;
            this.segments = [];
        }
        this.xVel *= 0.98;
        this.yVel *= 0.98;
    }

    draw(p5: P5): boolean {
        p5.stroke(this.color.r, this.color.g, this.color.b);
        p5.strokeWeight(3);
        p5.beginShape(p5.LINES);
        p5.vertex(this.x, this.y);
        for (let i = Math.floor(Math.min(this.segments.length - 1, this.hp / 10)); i >= 0; --i) {
            p5.vertex(this.segments[i].x, this.segments[i].y);
        }
        p5.endShape();

        this.segments.push({ x: this.x, y: this.y });
        if (this.segments.length > this.hp / 10) {
            this.segments.shift();
        }
        this.hp -= 0.1;
        if (this.hp > 0) return true;
        return false;
    }
}
export class EcosystemSketch extends React.PureComponent<SketchPreviewProps, EcosystemSketchState> {
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
        const pScale = 0.01;
        const dt = 0.01;
        let t = 0;
        const particles: Particle[] = [];
        const food: Food[] = [];

        p5.setup = (): void => {
            p5.createCanvas(W, H);
            for (let i = 0; i < 100; ++i) {
                particles.push(new Particle(Math.random() * W, Math.random() * H, W, H));
            }

            for (let i = 0; i < 10; ++i) {
                food.push({ x: Math.random() * W, y: Math.random() * H, rad: 15 });
            }
        };

        p5.draw = (): void => {
            const backgroundColor = hexToRgb(this.props.theme.backgroundColor.primary);
            p5.background(backgroundColor.r, backgroundColor.g, backgroundColor.b);
            p5.stroke(120, 120, 0);
            for (let i = 0; i < particles.length; ++i) {
                const p = particles[i];
                const alive = p.draw(p5);
                if (alive) {
                    const theta = p5.noise(p.x * pScale, p.y * pScale, t) * Math.PI * 4;
                    const dx = Math.cos(theta) * 0.1;
                    const dy = Math.sin(theta) * 0.1;
                    p.applyForce(dy, dx);
                    const ind = p.lookForFood(p5, food);
                    if (ind != -1) {
                        food[ind].x = Math.random() * W;
                        food[ind].y = Math.random() * H;
                        food[ind].rad = p5.constrain(Math.random() * 25, 5, 25);
                    }
                    p.update();
                } else {
                    particles.splice(i, i + 1);
                }
            }

            p5.fill(0, 128, 0);
            p5.noStroke();
            for (const f of food) {
                p5.circle(f.x, f.y, f.rad * 2);
            }
            t += dt;
        };
    };

    generatePerlinMap(p5: P5, w: number, h: number, scale: number, t: number): number[][] {
        const result = [];
        for (let r = 0; r < h; ++r) {
            result[r] = [];
            for (let c = 0; c < w; ++c) {
                result[r][c] = p5.noise(c * scale, r * scale, t);
            }
        }
        return result;
    }

    render(): JSX.Element {
        return <div ref={this.state.canvasRef} />;
    }
}

export const EcosystemSketchComponent = (props: SketchPreviewProps): JSX.Element => {
    const W = window.innerWidth - getScrollbarWidth();
    const H = window.innerHeight;
    return <EcosystemSketch {...props} width={W} height={H} />;
};

export const EcosystemSketchPreview = (props: SketchPreviewProps): JSX.Element => {
    return <EcosystemSketch {...props} />;
};
