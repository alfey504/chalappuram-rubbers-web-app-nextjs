
export const CustomCheckBox = ({
    className,
    checked,
    onClick,
}:{
    className?: string,
    checked: boolean,
    onClick?: ()=>void,
}) => {
    return( 
        <div className={className?? ""}>
            {!checked &&  <div className="h-4 w-4 border-2 border-light-primary rounded-md hover:h-5 hover:w-5" onClick={onClick}></div>}
            {checked  &&  <div className="h-4 w-4 border-2 border-light-primary rounded-md flex items-center justify-center hover:h-5 hover:w-5" onClick={onClick}><div className="bg-light-secondary h-2 w-2"></div></div>}
        </div>
    )
}