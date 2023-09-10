
export default function FloatingPanel(props: React.PropsWithChildren) {
    return (<div className='z-50 bg-gray-300/50 w-fit h-screen p-2 m-5 rounded-lg backdrop-blur-xl shadow-xl resize-x'>
        {props.children}
    </div>);
}
