import { Tool } from '../Tool';
import ToolButton from './ToolButton';
import StateManager from '../StateManager';

import { BsArrowRight, BsCursorFill, BsDownload, BsPlusCircleFill, BsUpload } from 'react-icons/bs';
interface ToolboxProps {
    currentTool: Tool
    setCurrentTool: React.Dispatch<React.SetStateAction<Tool>>
}

export default function Toolbox(props: React.PropsWithChildren<ToolboxProps>) {
    return (<div className='flex flex-col'>
        <ToolButton tool={Tool.Select} setCurrentTool={props.setCurrentTool} currentTool={props.currentTool}>
            <div className='flex flex-row items-center place-content-center'>
                <BsCursorFill className='mr-1'/>
                Select
            </div>
        </ToolButton>
        <ToolButton tool={Tool.States} setCurrentTool={props.setCurrentTool} currentTool={props.currentTool}>
            <div className='flex flex-row items-center place-content-center'>
                <BsPlusCircleFill className='mr-1'/>
                Add States
            </div>

        </ToolButton>
        <ToolButton tool={Tool.Transitions} setCurrentTool={props.setCurrentTool} currentTool={props.currentTool}>
            <div className='flex flex-row items-center place-content-center'>
                <BsArrowRight className='mr-1'/>
                Add Transitions
            </div>
        </ToolButton>
        <div className='grow'></div>
        <button className='rounded-full p-2 m-1 mx-2 block bg-amber-500 text-white text-center' onClick={StateManager.downloadJSON}>
            <div className='flex flex-row items-center place-content-center'>
                <BsDownload className='mr-1'/>
                Save
            </div>
        </button>
        <input type='file' id='file-uploader' onChange={StateManager.uploadJSON}></input>
        <button className='rounded-full p-2 m-1 mx-2 block bg-amber-500 text-white text-center'>
            <div className='flex flex-row items-center place-content-center'>
                <BsUpload className='mr-1'/>
                Load
            </div>
        </button>
    </div>);
}