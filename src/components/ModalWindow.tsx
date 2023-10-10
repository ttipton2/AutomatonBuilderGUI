import { BsXLg } from "react-icons/bs";

interface ClosableModalWindowProps {
    title?: string,
    close?: () => void
}

export function ClosableModalWindow(props: React.PropsWithChildren<ClosableModalWindowProps>) {
    return (<ModalWindow>
        <div className="m-3">
            <div className="flow-root">
                <div className="float-left">
                    <div className="font-medium text-3xl mb-2">
                        {props.title}
                    </div>
                </div>
                <button className="float-right" onClick={props.close}>
                    <BsXLg />
                </button>
            </div>
            {props.children}
        </div>
    </ModalWindow>);
}

export default function ModalWindow(props: React.PropsWithChildren) {
    return (
        <>
            <div className={`fixed inset-0 z-40 bg-gray-500 bg-opacity-50 transition-opacity backdrop-blur-sm`}></div>
            <div className={`fixed inset-0 z-50 w-screen overflow-y-auto`}>
                <div className={`flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0`}>
                    <div className='relative transform overflow-hidden rounded-xl bg-gray-100 text-left shadow-xl transition-all sm:w-full sm:max-w-lg'>
                        {props.children}
                    </div>
                </div>
            </div>
        </>
    );
}
