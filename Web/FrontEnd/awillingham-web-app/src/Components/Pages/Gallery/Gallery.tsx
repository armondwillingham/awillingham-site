import { createUseStyles, Styles, useTheme } from 'react-jss';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { SketchList } from './SketchList';
import { Theme } from 'Themes/BaseTheme';
import { SketchPreviewProps } from 'Components/Sketches/SketchTypes';

export const Gallery: React.FC = () => {
    const theme: Theme = useTheme();
    const styles = useStyles();

    const galleryComponents: JSX.Element[] = SketchList.map((sketch, i) => (
        <NavLink to={sketch.name} key={i} className={styles.content}>
            {React.createElement<SketchPreviewProps>(sketch.preview, { theme: theme, width: 100, height: 100 })}
        </NavLink>
    ));

    return <div className={styles.container}>{galleryComponents}</div>;
};

const useStyles = createUseStyles(
    (theme: Theme): Styles => ({
        container: {
            display: 'flex',
        },
        content: {
            margin: '1rem',
            border: `1px ${theme.textColor.primary} solid`,
        },
    }),
);
