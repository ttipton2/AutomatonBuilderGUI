import { useEffect, useState } from "react";
import TokenWrapper from "../TokenWrapper";
import DetailsBox_AlphabetEditor from "./DetailsBox/DetailsBox_AlphabetEditor";
import StateManager from "../StateManager";

// interface ModalWindowListItemProps {
//     selection: Array<SelectableObject>
//     startNode: NodeWrapper
//     setStartNode: React.Dispatch<React.SetStateAction<NodeWrapper>>
// }

interface ModalWindowListItemProps {
    title: string,
    subtitle?: string | undefined,
    rightContent?: JSX.Element | undefined,
    destination?: any | null
}

function CoreListItem(props: React.PropsWithChildren) {
    return (
        <div className="flow-root bg-white p-2 px-2 first:rounded-t-lg last:rounded-b-lg">
            {props.children}
        </div>
    );
}

function CoreListItem_Left(props: React.PropsWithChildren) {
    return (
        <div className="float-left align-middle">
            {props.children}
        </div>
    );
}

function CoreListItem_Right(props: React.PropsWithChildren) {
    return (
        <div className="float-right align-middle">
            {props.children}
        </div>
    );
}

function ListItem(props: React.PropsWithChildren<ModalWindowListItemProps>) {
    return (
        <CoreListItem>
            <CoreListItem_Left>
                {props.title}
                <div className="text-sm text-gray-600">
                    {props.subtitle}
                </div>
            </CoreListItem_Left>
            <CoreListItem_Right>
                {props.rightContent}
            </CoreListItem_Right>
            <CoreListItem_Right>
                {props.destination !== null && props.destination !== undefined ? ">" : ""}
            </CoreListItem_Right>
        </CoreListItem>
    );
}

interface ListItem_TokenEditorProps {
    tokenWrapper: TokenWrapper
    removeFunc: (tk: TokenWrapper) => void
}

function ListItem_TokenEditor(props: React.PropsWithChildren<ListItem_TokenEditorProps>) {
    const tw = props.tokenWrapper;
    const [tokenSymbol, setTokenSymbol] = useState(tw.symbol);

    useEffect(() => {
        tw.symbol = tokenSymbol;
    }, [tokenSymbol]);

    // focus:outline-none
    return (
        <CoreListItem>
            <div className="flex flex-row">
                <div className="flex-1 grow float-left">
                    <input className="" type="text" placeholder="Token symbol" value={tokenSymbol} onChange={e => setTokenSymbol(e.target.value)}></input>
                    {/* <div className="text-sm text-gray-600">
                        Error text could go here
                    </div> */}
                </div>
                <button className="flex-0 float-right rounded-full mx-2 px-2 block aspect-square bg-red-500 text-center text-white align-middle" onClick={() => props.removeFunc(tw)}>x</button>
            </div>

        </CoreListItem>
    )
}

function AlphabetList() {
    // UNDERLYING IDEA HERE: Alphabet is stored in the React component's state.
    // Whenever the React state variables are changed, push them to the StateManager.

    const [alphabet, setAlphabet] = useState(StateManager.alphabet);

    function addTokenToAlphabet() {
        const newAlphabet = [...alphabet];
        newAlphabet.push(new TokenWrapper());
        setAlphabet(newAlphabet);
    }

    function removeTokenFromAlphabet(tk: TokenWrapper) {
        const newAlphabet = alphabet.filter(i => i !== tk);
        setAlphabet(newAlphabet);
    }

    useEffect(() => {
        StateManager.alphabet = alphabet;
    }, [alphabet]);

    const tokenWrapperElements = alphabet.map(tw => <ListItem_TokenEditor tokenWrapper={tw} removeFunc={removeTokenFromAlphabet} key={tw.id} />);

    return (<>
        <div className="mt-3 ml-1 mb-1">
            Input Alphabet
        </div>
        <div className="divide-y">
            {tokenWrapperElements}
            <CoreListItem>
                <CoreListItem_Left>
                    <button className="text-blue-500" onClick={addTokenToAlphabet}>+ Add Token</button>
                </CoreListItem_Left>
            </CoreListItem>
        </div>
    </>);
}
export default function ConfigureAutomatonWindow() {
    const faTypeSelector = (
        <select name="automaton-type" id="automaton-type" className="float-right align-bottom">
            <option value="dfa">DFA</option>
            <option value="nfa">NFA</option>
        </select>
    );

    return (
        <div className="m-3">
            <div className="flow-root">
                <div className="float-left">
                    <div className="font-medium text-3xl mb-2">
                        Configure Automaton
                    </div>
                </div>
                <div className="float-right">
                    X
                </div>
            </div>
            <div className="divide-y">
                <ListItem
                    title="Automaton Type"
                    subtitle="An NFA will have fewer requirements than a DFA."
                    rightContent={faTypeSelector}
                />

            </div>
            <AlphabetList />
        </div>
    );
}