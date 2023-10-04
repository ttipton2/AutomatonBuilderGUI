import DetailsBox_AlphabetEditor from "./DetailsBox/DetailsBox_AlphabetEditor";

export default function ConfigureAutomatonWindow() {
    return (
        <div className="m-3">
            <div className="font-medium text-3xl">
                Configure Automaton
            </div>
            <DetailsBox_AlphabetEditor />
        </div>
    )
}