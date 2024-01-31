import { ReactElement } from "react"
import { useFormStatus } from "react-dom"

export const CustomSubmitButton = ({
    className,
    disabled,
    text,
}: {
    className?: string
    disabled?: boolean
    text: string
}): ReactElement => {

    const classes = (className == undefined) ? "" : className
    const isDisabled = (disabled == undefined) ? false : disabled 

    return (
        <div className={classes}>
            <button  aria-disabled={disabled} className=" bg-light-secondary p-3 px-8 rounded-md text-light-secondary" type="submit"> {text} </button>
        </div>
    )
}

export const CustomButton = ({
    className,
    disabled,
    text,
    onClick,
}: {
    className?: string,
    disabled?: boolean,
    text: string,
    onClick?: ()=>void
}): ReactElement => {

    const classes = (className == undefined) ? "" : className
    const isDisabled = (disabled == undefined) ? false : disabled 

    return (
        <div className={classes}>
            <button  aria-disabled={disabled} disabled={disabled} className=" bg-light-secondary p-3 px-8 rounded-md text-light-secondary disabled:bg-slate-600" type="submit" onClick={onClick}> {text} </button>
        </div>
    )
}