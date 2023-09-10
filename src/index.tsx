import StateManager from './StateManager';
import { Tool } from './Tool';
import { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import NodeView from './components/NodeView';
import Toolbox from './components/Toolbox';
import FloatingPanel from './components/FloatingPanel';

function App() {
    const [currentTool, setCurrentTool] = useState(Tool.States);

    // Switch current tool when keys pressed
    useEffect(() => {
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
    
    return (<>
        <NodeView />
        <div className='flex flex-row'>
            <FloatingPanel>
                <div className='flex flex-col'>
                    Details about selection go here
                </div>
            </FloatingPanel>
            <FloatingPanel>
                <Toolbox currentTool={currentTool} setCurrentTool={setCurrentTool}/>
            </FloatingPanel>
        </div>
    </>
    );
}

const domNode = document.getElementById('react-root');
const root = createRoot(domNode);
root.render(<App />);