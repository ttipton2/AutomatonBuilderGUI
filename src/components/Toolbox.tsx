import { Tool } from '../Tool';
import ToolButton from './ToolButton';
import StateManager from '../StateManager';

import { BsArrowRight, BsCursor, BsCursorFill, BsDownload, BsNodePlus, BsNodePlusFill, BsPlusCircle, BsPlusCircleFill, BsUpload } from 'react-icons/bs';
interface ToolboxProps {
    currentTool: Tool
    setCurrentTool: React.Dispatch<React.SetStateAction<Tool>>
}

export default function Toolbox(props: React.PropsWithChildren<ToolboxProps>) {
    return (<div className='flex flex-col text-xl'>
        <ToolButton tool={Tool.Select} setCurrentTool={props.setCurrentTool} currentTool={props.currentTool} title="Select [S]">
            <div className='flex flex-row items-center place-content-center'>
                {props.currentTool === Tool.Select ? <BsCursorFill /> : <BsCursor />}
                {/* Select */}
            </div>
        </ToolButton>
        <ToolButton tool={Tool.States} setCurrentTool={props.setCurrentTool} currentTool={props.currentTool} title="Add States [A]">
            <div className='flex flex-row items-center place-content-center'>
                {props.currentTool === Tool.States ? <BsPlusCircleFill /> : <BsPlusCircle />}
                {/* Add States */}
            </div>

        </ToolButton>
        <ToolButton tool={Tool.Transitions} setCurrentTool={props.setCurrentTool} currentTool={props.currentTool} title="Add Transitions [T]">
            <div className='flex flex-row items-center place-content-center'>
                {props.currentTool === Tool.Transitions ? <BsNodePlusFill /> : <BsNodePlus />}
                {/* Add Transitions */}
            </div>
        </ToolButton>
        <div className='grow'></div>
        <button className='rounded-full p-2 m-1 mx-2 block bg-amber-500 text-white text-center' onClick={StateManager.downloadJSON} title="Download from JSON">
            <div className='flex flex-row items-center place-content-center'>
                <BsDownload className='mr-0'/>
                {/* Save */}
            </div>
        </button>
        {/* <input type='file' id='file-uploader' onChange={StateManager.uploadJSON}></input> */}
        <button className='rounded-full p-2 m-1 mx-2 block bg-amber-500 text-white text-center' title="Load from JSON">
            <div className='flex flex-row items-center place-content-center'>
                <BsUpload className='mr-0'/>
                {/* Load */}
            </div>
        </button>
    </div>);
}