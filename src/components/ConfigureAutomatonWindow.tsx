import DetailsBox_AlphabetEditor from "./DetailsBox/DetailsBox_AlphabetEditor";

export default function ConfigureAutomatonWindow() {
    return (
        <div className="m-3">
            <div className="font-medium text-3xl">
                Configure Automaton
            </div>
            <div className="flow-root mb-5">
                <label htmlFor="automaton-type" className="float-left">
                    Automaton Type
                    <div className="text-gray-300">
                        A DFA will have additional requirements to be valid from
                        an NFA.
                    </div>
                </label>
                <select name="automaton-type" id="automaton-type" className="float-right">
                    <option value="dfa">DFA</option>
                    <option value="nfa">NFA</option>
                </select>
            </div>
            <DetailsBox_AlphabetEditor />
        </div>
    )
}