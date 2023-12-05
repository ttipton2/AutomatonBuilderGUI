import DFAState from 'automaton-kit/lib/dfa/DFAState';
import DFA from 'automaton-kit/lib/dfa/DFA';
import DFATransition from 'automaton-kit/lib/dfa/DFATransition';
import DFARunner, { DFARunnerStatus } from 'automaton-kit/lib/dfa/DFARunner';



export function testStringOnAutomata(dfa: DFA, testString: string): string {
    
    // Logic is pretty straightforward. Creates an instance of a DFARunner, runs the DFA passed to it with the test
    // string and returns the result to the test string window.
    let runner = new DFARunner(dfa, testString.split(''));
    runner.runUntilConclusion();
    let result = runner.getStatus();

    return result === DFARunnerStatus.Accepted ? 'Accepted' : 'Rejected';
}