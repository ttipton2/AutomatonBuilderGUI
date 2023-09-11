import StateManager from './StateManager';
import { Tool } from './Tool';
import { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import NodeView from './components/NodeView';
import Toolbox from './components/Toolbox';
import FloatingPanel from './components/FloatingPanel';
import SelectableObject from './SelectableObject';
import DetailsBox from './components/DetailsBox/DetailsBox';

function App() {
    const [currentTool, setCurrentTool] = useState(Tool.States);
    const [selectedObjects, setSelectedObjects] = useState(new Array<SelectableObject>());

    // Switch current tool when keys pressed
    useEffect(() => {
        StateManager.setSelectedObjects = setSelectedObjects;
        addEventListener('keydown', (ev: KeyboardEvent) => {
            if (ev.code === "KeyA") {
                setCurrentTool(Tool.States);
            }
            else if (ev.code === "KeyT") {
                setCurrentTool(Tool.Transitions);
            }
            else if (ev.code === "KeyS") {
                setCurrentTool(Tool.Select);
            }
        });
    }, []);

    useEffect(() => {
        StateManager.currentTool = currentTool;
    }, [currentTool]);

    useEffect(() => {
        StateManager.selectedObjects = selectedObjects;
    }, [selectedObjects]);
    
    // Sounds like we may want to do something with refs...
    // First, I guess figure out a placeholder UI for when you have a node selected?
    return (<>
        <NodeView />
        <div className='flex flex-row h-screen'>
            <FloatingPanel heightPolicy='min'>
                <DetailsBox selection={selectedObjects} />
            </FloatingPanel>
            <FloatingPanel heightPolicy='min'>
                <Toolbox currentTool={currentTool} setCurrentTool={setCurrentTool}/>
            </FloatingPanel>
        </div>
    </>
    );
}

const domNode = document.getElementById('react-root');
const root = createRoot(domNode);
root.render(<App />);