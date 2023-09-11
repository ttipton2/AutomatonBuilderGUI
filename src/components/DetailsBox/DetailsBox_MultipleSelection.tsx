interface DetailsBox_MultipleSelectionProps {
    numItemsSelected: number
}

export default function DetailsBox_MultipleSelection(props: React.PropsWithChildren<DetailsBox_MultipleSelectionProps>) {
    return <div className="max-h-screen flex flex-col items-center justify-center text-black/50">
        <div className="flex-1">{props.numItemsSelected} items selected</div>
        </div>;
}