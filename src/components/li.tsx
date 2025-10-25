interface LiProps {
    label: string;
    value: string
}

export const Li = ({
    label, 
    value
}: LiProps) => {
    return (
        <li className="flex  gap-2 text-sm">
            <h2 className="font-bold">{label}:</h2>
            {value}
        </li>
    )
}