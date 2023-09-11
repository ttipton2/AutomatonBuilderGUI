import { useState, useEffect } from "react";
import NodeWrapper from "../../NodeWrapper";
import SelectableObject from "../../SelectableObject";

interface DetailsBox_StateSelectionProps {
    nodeWrapper: NodeWrapper
}

export default function DetailsBox_StateSelection(props: DetailsBox_StateSelectionProps) {
    const nw = props.nodeWrapper;
    const [nodeName, setLabelText] = useState(props.nodeWrapper.labelText);

    useEffect(() => {
        props.nodeWrapper.labelText = nodeName;
    }, [nodeName]);

    return (
        <div>
            <input className="text-inherit/40 font-medium text-lg" type="text" placeholder="State name" value={nodeName} onChange={e => setLabelText(e.target.value)}></input>
            <div className="text-inherit/40 bg-transparent text-sm">Start State</div>
            <input type="checkbox" id="is-accept-state" name="is-accept-state"></input>
            <label htmlFor="is-accept-state">Accept State</label>
        </div>
    );
}