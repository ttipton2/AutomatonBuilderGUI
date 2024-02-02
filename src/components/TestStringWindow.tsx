import { useState } from "react";
import { testStringOnAutomata } from "./TestStringOnAutomata";
import { BsFillClipboardCheckFill } from "react-icons/bs";
import DFA from 'automaton-kit/lib/dfa/DFA';
import DFATransition from 'automaton-kit/lib/dfa/DFATransition';
import DFAState from 'automaton-kit/lib/dfa/DFAState';
import StateManager from "../StateManager";
export default function TestStringWindow() {
    const [testString, setTestString] = useState('');
    const [result, setResult] = useState('');

    //This is logic from the test code provided. In the future, we will need to connect
    //the GUI to the functions so that the DFA creates itself as the user adds states and transitions.
    /*
    let q0 = new DFAState();
    let q1 = new DFAState();
    let dfa = new DFA();
    dfa.states = [q0, q1];  // Set (array) of states
    dfa.inputAlphabet = ["a", "b"];  // Set (array) of input alphabet tokens
    dfa.transitions = [  // Transition function (array of valid transitions)
    new DFATransition(q0, "a", q1),
    new DFATransition(q0, "b", q0),
    new DFATransition(q1, "a", q1),
    new DFATransition(q1, "b", q1)
    ];
    dfa.startState = q0;  // Single state that is the initial state
    dfa.acceptStates = [q1];  // Set (array) of states that will cause it to accept
    */
    const handleTestString = () => {
        const testResult = testStringOnAutomata(testString);
        setResult(testResult);
    };

    return (
        <div>
            <div className="flex items-center bg-white p-3 rounded-lg shadow-sm border border-gray-300">
                <input
                    className="focus:outline-none bg-transparent flex-grow border-0 py-2"
                    type="text"
                    placeholder="Enter string to test"
                    value={testString}
                    onChange={e => setTestString(e.target.value)}
                />
                <button
                    className="ml-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-700"
                    onClick={handleTestString}
                >
                    <BsFillClipboardCheckFill />
                </button>
            </div>
            {result && <div className="mt-4 text-lg font-semibold">{`Result: ${result}`}</div>}
            {/* This div creates extra space at the bottom */}
            <div className="flex-1"></div>
        </div>
    );
}
