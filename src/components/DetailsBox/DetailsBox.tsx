import NodeWrapper from "../../NodeWrapper";
import SelectableObject from "../../SelectableObject";
import DetailsBox_MultipleSelection from "./DetailsBox_MultipleSelection";
import DetailsBox_NoSelection from "./DetailsBox_NoSelection";
import DetailsBox_StateSelection from "./DetailsBox_StateSelection";

interface DetailsBoxProps {
    selection: Array<SelectableObject>
}

export default function DetailsBox(props: React.PropsWithChildren<DetailsBoxProps>) {
    if (props.selection.length == 0) {
        return (<DetailsBox_NoSelection />);
    }
    else {
        const nws = (props.selection as Array<NodeWrapper>);
        return (<div className="divide-y divide-solid divide-black">
            {nws.map((item) => <DetailsBox_StateSelection nodeWrapper={item} />)}
        </div>);
    }
    
}