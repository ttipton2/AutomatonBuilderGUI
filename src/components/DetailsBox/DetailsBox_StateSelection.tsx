import { useState, useEffect } from "react";
import NodeWrapper from "../../NodeWrapper";
import SelectableObject from "../../SelectableObject";

interface DetailsBox_StateSelectionProps {
    nodeWrapper: NodeWrapper
}

export default function DetailsBox_StateSelection(props: DetailsBox_StateSelectionProps) {
    const nw = props.nodeWrapper;
    const [nodeLabelText, setLabelText] = useState(props.nodeWrapper.labelText);
    const [isAcceptNode, setIsAcceptNode] = useState(props.nodeWrapper.isAcceptNode);

    useEffect(() => {
        props.nodeWrapper.labelText = nodeLabelText;
    }, [nodeLabelText]);

    useEffect(() => {
        props.nodeWrapper.isAcceptNode = isAcceptNode;
    }, [isAcceptNode]);

    return (
        <div>
            <input className="text-inherit/40 font-medium text-lg" type="text" placeholder="State name" value={nodeLabelText} onChange={e => setLabelText(e.target.value)}></input>
            {/* <div className="text-inherit/40 bg-transparent text-sm">Start State</div> */}
            <input type="checkbox" id="is-accept-state" name="is-accept-state" checked={isAcceptNode} onChange={e => setIsAcceptNode(e.target.checked)}></input>
            <label htmlFor="is-accept-state">Accept State</label>
        </div>
    );
}