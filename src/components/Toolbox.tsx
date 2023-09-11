import { Tool } from '../Tool';
import ToolButton from './ToolButton';

interface ToolboxProps {
    currentTool: Tool
    setCurrentTool: React.Dispatch<React.SetStateAction<Tool>>
}

export default function Toolbox(props: React.PropsWithChildren<ToolboxProps>) {
    return (<div className='flex flex-col'>
        <ToolButton tool={Tool.Select} setCurrentTool={props.setCurrentTool} currentTool={props.currentTool}>Select</ToolButton>
        <ToolButton tool={Tool.States} setCurrentTool={props.setCurrentTool} currentTool={props.currentTool}>Add States</ToolButton>
        <ToolButton tool={Tool.Transitions} setCurrentTool={props.setCurrentTool} currentTool={props.currentTool}>Transitions</ToolButton>
    </div>);
}