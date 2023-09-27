import { Tool } from '../Tool';
import ToolButton from './ToolButton';
import StateManager from '../StateManager';
interface ToolboxProps {
    currentTool: Tool
    setCurrentTool: React.Dispatch<React.SetStateAction<Tool>>
}

export default function Toolbox(props: React.PropsWithChildren<ToolboxProps>) {
    return (<div className='flex flex-col'>
        <ToolButton tool={Tool.Select} setCurrentTool={props.setCurrentTool} currentTool={props.currentTool}>Select</ToolButton>
        <ToolButton tool={Tool.States} setCurrentTool={props.setCurrentTool} currentTool={props.currentTool}>Add States</ToolButton>
        <ToolButton tool={Tool.Transitions} setCurrentTool={props.setCurrentTool} currentTool={props.currentTool}>Transitions</ToolButton>
        <div className='grow'></div>
        <button className='rounded-full p-2 m-1 mx-2 block bg-amber-500 text-white text-center' onClick={StateManager.downloadJSON}>Save</button>
        <input type='file' id='file-uploader' onChange={StateManager.uploadJSON}></input>
        <button className='rounded-full p-2 m-1 mx-2 block bg-amber-500 text-white text-center'>Load</button>
    </div>);
}