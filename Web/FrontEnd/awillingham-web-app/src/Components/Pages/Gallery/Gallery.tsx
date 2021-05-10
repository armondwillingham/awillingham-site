import React from 'react';
import { NavLink } from 'react-router-dom';
import { SketchList } from './SketchList';

export const Gallery: React.FC = () => {
    const galleryComponents: JSX.Element[] = SketchList.map((sketch, i) => (
        <NavLink to={sketch.name} key={i}>
            {React.createElement<any>(sketch.preview)}
        </NavLink>
    ));

    return <div>{galleryComponents}</div>;
};
