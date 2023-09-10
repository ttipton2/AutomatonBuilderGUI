import StateManager from './StateManager';
import { Tool } from './Tool';
import { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import ToolButton from './ToolButton';

interface NodeViewProps {}

function NodeView(props: React.PropsWithChildren<NodeViewProps>) {
    useEffect(() => {
        StateManager.initialize();
    }, []);
    return (<div className="z-0 absolute left-0 top-0" id="graphics-container"></div>);
}


interface ToolboxProps {
    currentTool: Tool
    setCurrentTool: React.Dispatch<React.SetStateAction<Tool>>
}

function Toolbox(props: React.PropsWithChildren<ToolboxProps>) {
    return (<div className='flex flex-col'>
        <ToolButton tool={Tool.Select} setCurrentTool={props.setCurrentTool} currentTool={props.currentTool}>Select</ToolButton>
        <ToolButton tool={Tool.States} setCurrentTool={props.setCurrentTool} currentTool={props.currentTool}>Add States</ToolButton>
        <ToolButton tool={Tool.Transitions} setCurrentTool={props.setCurrentTool} currentTool={props.currentTool}>Transitions</ToolButton>
    </div>);
}

function FloatingPanel(props: React.PropsWithChildren) {
    return (<div className='z-50 bg-gray-300/50 w-fit h-screen p-2 m-5 rounded-lg backdrop-blur-xl shadow-xl resize-x'>
        {props.children}
    </div>);
}

function Page() {
    const [currentTool, setCurrentTool] = useState(Tool.States);

    useEffect(() => {
        addEventListener('keydown', (ev: KeyboardEvent) => {
            if (ev.code === "KeyA") {
                StateManager.currentTool = Tool.States;
                setCurrentTool(StateManager.currentTool);
            }
            else if (ev.code === "KeyT") {
                StateManager.currentTool = Tool.Transitions;
                setCurrentTool(StateManager.currentTool);
            }
            else if (ev.code === "KeyS") {
                StateManager.currentTool = Tool.Select;
                setCurrentTool(StateManager.currentTool);
            }
        });
    }, []);
    
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
root.render(<Page />);