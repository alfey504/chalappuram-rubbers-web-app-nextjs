import { ReactNode } from "react"

export const LinkButton = ({
    className,
    text,
}: {
    className?: string,
    text: string
}): ReactNode => {
    const classes = (className == undefined)? "" : className
    return (
        <a href="/" className={" border-2 border-light-primary text-light-primary hover:bg-light-secondary hover:text-light-primary-alt" + " " + classes}>{text}</a>
    )
}