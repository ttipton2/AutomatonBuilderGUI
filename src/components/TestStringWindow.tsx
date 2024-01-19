import { useEffect, useState } from "react";
import { testStringOnAutomata } from "./TestStringOnAutomata";
import { BsFillClipboardCheckFill } from "react-icons/bs";
import DFA from 'automaton-kit/lib/dfa/DFA';
import DFATransition from 'automaton-kit/lib/dfa/DFATransition';
import DFAState from 'automaton-kit/lib/dfa/DFAState';
import StateManager from "../StateManager";

export default function TestStringWindow() {
    const [testString, setTestString] = useState('');
    const [result, setResult] = useState('');

    let dfa = StateManager.dfa;

    // Create states for the DFA
    let q0 = new DFAState("q0");
    let q1 = new DFAState("q1");

// Create the DFA itself
//let dfa = StateManager.dfa;
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

    StateManager.logDFAConfiguration();
    // Log DFA configuration whenever the test string changes
    useEffect(() => {
        console.log("Testing string Window:", testString);
        StateManager.logDFAConfiguration();
    }, [testString]);

    const handleTestString = () => {
        //const dfa = StateManager.dfa;
        if (dfa) {
            
            
            const testResult = testStringOnAutomata(dfa, testString);
            setResult(testResult);
            console.log("DFA configuration at the time of testing:");
            StateManager.logDFAConfiguration();
            
        } else {
            console.error("DFA is not initialized or not available.");
            setResult('DFA not initialized or not available.');
        }
    };

    return (
        <div>
            {}
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
                    Test String
                </button>
            </div>
            {result && <div className="mt-4 text-lg font-semibold">{`Result: ${result}`}</div>}
            {/* Rest of your component */}
        </div>
    );
}
