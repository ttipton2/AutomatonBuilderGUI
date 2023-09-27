import NodeWrapper from "../../NodeWrapper";
import SelectableObject from "../../SelectableObject";
import TransitionWrapper from "../../TransitionWrapper";
import DetailsBox_AlphabetEditor from "./DetailsBox_AlphabetEditor";
import DetailsBox_MultipleSelection from "./DetailsBox_MultipleSelection";
import DetailsBox_NoSelection from "./DetailsBox_NoSelection";
import DetailsBox_StateSelection from "./DetailsBox_StateSelection";
import DetailsBox_TransitionSelection from "./DetailsBox_TransitionSelection";

interface DetailsBoxProps {
    selection: Array<SelectableObject>
    startNode: NodeWrapper
    setStartNode: React.Dispatch<React.SetStateAction<NodeWrapper>>
}

export default function DetailsBox(props: React.PropsWithChildren<DetailsBoxProps>) {
    if (props.selection.length == 0) {
        return (<DetailsBox_AlphabetEditor />);
    }
    else {
        const selectionElements: Array<JSX.Element> = [];

        for (let i = 0; i < props.selection.length; i++) {
            const item = props.selection[i];

            if (item instanceof NodeWrapper) {
                selectionElements.push(<DetailsBox_StateSelection
                key={item.id}
                nodeWrapper={item}
                startNode={props.startNode}
                setStartNode={props.setStartNode} />);
            }
            else if (item instanceof TransitionWrapper) {
                selectionElements.push(<DetailsBox_TransitionSelection key={item.id} transitionWrapper={item}/>);
            }
        }
        const nws = (props.selection as Array<NodeWrapper>);
        return (<div className="divide-y divide-solid divide-black">
            {selectionElements}
        </div>);
    }

}