import { useState, useEffect } from 'react';
import StateManager from '../StateManager';

interface NodeViewProps {}

export default function NodeView(props: React.PropsWithChildren<NodeViewProps>) {
    useEffect(() => {
        StateManager.initialize();
    }, []);

    // TODO: dark:bg-gray-900 is a good color for the background in dark mode,
    // but the Konva objects themselves should also probably be recolored, and
    // I'm not sure how to do that yet. So the canvas itself will need to remain
    // light for now.
    return (<div className="z-0 absolute left-0 top-0 dark:bg-neutral-900" id="graphics-container"></div>);
}