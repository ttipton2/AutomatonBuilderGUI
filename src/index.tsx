import StateManager from './StateManager';
import { Tool } from './Tool';
import { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import NodeView from './components/NodeView';
import Toolbox from './components/Toolbox';
import FloatingPanel from './components/FloatingPanel';
import SelectableObject from './SelectableObject';
import DetailsBox from './components/DetailsBox/DetailsBox';
import ModalWindow from './components/ModalWindow';
import ConfigureAutomatonWindow from './components/ConfigureAutomatonWindow';

function App() {
    const [currentTool, setCurrentTool] = useState(Tool.States);
    const [selectedObjects, setSelectedObjects] = useState(new Array<SelectableObject>());
    const [startNode, setStartNode] = useState(StateManager.startNode);

    // Switch current tool when keys pressed
    useEffect(() => {
        StateManager.setSelectedObjects = setSelectedObjects;
        addEventListener('keydown', (ev: KeyboardEvent) => {
            // Ignore keyboard shortcuts if user is in a text box.
            // Solution from https://stackoverflow.com/a/4575309
            const n = document.activeElement.nodeName;
            if (n == 'TEXTAREA' || n == 'INPUT') {
                return;
            }
            
            if (ev.code === "KeyA") {
                setCurrentTool(Tool.States);
            }
            else if (ev.code === "KeyT") {
                setCurrentTool(Tool.Transitions);
            }
            else if (ev.code === "KeyS") {
                setCurrentTool(Tool.Select);
            }

            else if (ev.code === "KeyW") {
                console.log(StateManager.toJSON());
            }
        });
    }, []);

    useEffect(() => {
        StateManager.currentTool = currentTool;
    }, [currentTool]);

    useEffect(() => {
        StateManager.selectedObjects = selectedObjects;
    }, [selectedObjects]);

    useEffect(() => {
        StateManager.startNode = startNode;
    }, [startNode]);

    // Sounds like we may want to do something with refs...
    // First, I guess figure out a placeholder UI for when you have a node selected?
    return (<>
        <NodeView />
        <div className='flex flex-row h-screen'>
            <FloatingPanel heightPolicy='min'>
                <DetailsBox
                    selection={selectedObjects}
                    startNode={startNode}
                    setStartNode={setStartNode}
                />
                <div className="flex flex-row w-full">
                    <div className="h-8 flex-1 min-w-1 first:rounded-l-lg last:rounded-r-lg bg-red-400 p-1 text-center">Q</div>
                    <div className="h-8 flex-1 min-w-1 first:rounded-l-lg last:rounded-r-lg bg-orange-400 p-1 text-center">Σ</div>
                    <div className="h-8 flex-1 min-w-1 first:rounded-l-lg last:rounded-r-lg bg-yellow-400 p-1 text-center">δ</div>
                    <div className="h-8 flex-1 min-w-1 first:rounded-l-lg last:rounded-r-lg bg-green-400 p-1 text-center">q0</div>
                    <div className="h-8 flex-1 min-w-1 first:rounded-l-lg last:rounded-r-lg bg-blue-400 p-1 text-center">F</div>
                </div>
                {/* <div className='grid grid-cols-3'>
                    <div className='block bg-red-400  ml-2 p-1 text-center'>Configure</div>
                    <div className='block bg-green-400 p-1 text-center'>Debug</div>
                    <div className='block bg-blue-400 rounded-r-lg mr-2 p-1 text-center'>Test</div>
                </div> */}
            </FloatingPanel>
            <FloatingPanel heightPolicy='min'>
                <Toolbox currentTool={currentTool} setCurrentTool={setCurrentTool} />
            </FloatingPanel>
        </div>

        <ModalWindow>
            <ConfigureAutomatonWindow />
        </ModalWindow>
    </>
    );
}

const domNode = document.getElementById('react-root');
const root = createRoot(domNode);
root.render(<App />);