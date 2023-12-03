import { useState } from "react";
import { testStringOnAutomata } from "./TestStringOnAutomata";
import { BsFillClipboardCheckFill } from "react-icons/bs";

export default function TestStringWindow() {
    const [testString, setTestString] = useState('');

    const handleTestString = () => {
        testStringOnAutomata(testString);
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
            {/* This div creates extra space at the bottom */}
            <div className="flex-1"></div>
        </div>
    );
}
