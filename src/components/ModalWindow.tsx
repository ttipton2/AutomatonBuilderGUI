
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
