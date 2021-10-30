import { Gallery } from './Gallery/Gallery';
import { SketchList } from './Gallery/SketchList';
import { getSketchWrapper } from './Gallery/SketchWrapper';
import { HomePage } from './Home';
export interface RoutePair {
    route: string;
    component: React.ComponentClass | React.FunctionComponent;
}

export const Routes: RoutePair[] = [
    { route: '/', component: Gallery },
    { route: '/gallery', component: Gallery },
    ...SketchList.map((sketch): RoutePair => {
        return { route: `/${sketch.name}`, component: getSketchWrapper(sketch.component) };
    }),
];
