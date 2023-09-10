import { useState, useEffect } from 'react';
import StateManager from '../StateManager';

interface NodeViewProps {}

export default function NodeView(props: React.PropsWithChildren<NodeViewProps>) {
    useEffect(() => {
        StateManager.initialize();
    }, []);
    return (<div className="z-0 absolute left-0 top-0" id="graphics-container"></div>);
}