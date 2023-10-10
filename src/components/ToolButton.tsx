import { Tool } from "../Tool"

interface ToolButtonProps {
    title?: string,
    tool: Tool
    currentTool: Tool
    setCurrentTool: React.Dispatch<React.SetStateAction<Tool>>
}

export default function ToolButton(props: React.PropsWithChildren<ToolButtonProps>) {
    let classes = 'rounded-full p-2 m-1 mx-2 block ';

    if (props.tool === props.currentTool) {
        classes += 'bg-sky-500 text-white ';
    }
    else {
        classes += 'bg-white text-black';
    }

    function setToolToThis() { props.setCurrentTool(props.tool); }

    return <button id="states-button" className={classes} onClick={setToolToThis} title={props.title}>{props.children}</button>
}