import DFAState from 'automaton-kit/lib/dfa/DFAState';
import DFA from 'automaton-kit/lib/dfa/DFA';
import DFATransition from 'automaton-kit/lib/dfa/DFATransition';
import DFARunner, { DFARunnerStatus } from 'automaton-kit/lib/dfa/DFARunner';



export function testStringOnAutomata(dfa: DFA, testString: string): string {
    console.log("Testing string on Automata:", testString);

    // Logic is pretty straightforward. Creates an instance of a DFARunner, runs the DFA passed to it with the test
    // string and returns the result to the test string window.
    let runner = new DFARunner(dfa, testString.split(''));
    runner.runUntilConclusion();
    let result = runner.getStatus();

    // Debugging information
    console.log("Testing string:", testString);
    console.log("DFA Start State:", dfa.startState?.label);
    console.log("DFA Accept States:", dfa.acceptStates.map(s => s.label));
    console.log("DFA Transitions:", dfa.transitions.map(t => `${t.currentState.label} -${t.inputToken}-> ${t.targetState.label}`));
    console.log("Test Result:", result);
    console.log("DFA Configuration:");
console.log("States:", dfa.states.map(s => s.label));
console.log("Transitions:", dfa.transitions.map(t => `${t.currentState.label} -${t.inputToken}-> ${t.targetState.label}`));
console.log("Start State:", dfa.startState?.label);
console.log("Accept States:", dfa.acceptStates.map(s => s.label));
console.log("Alphabet:", dfa.inputAlphabet);

    return result === DFARunnerStatus.Accepted ? 'Accepted' : 'Rejected';
}