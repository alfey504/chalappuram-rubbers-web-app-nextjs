import { ReactNode } from "react"

export const LinkButton = ({
    className,
    text,
    link,
}: {
    className?: string,
    text: string,
    link?: string,
}): ReactNode => {
    const classes = (className == undefined)? "" : className
    return (
        <a href={link ?? "/"} className={" border-2 border-light-primary text-light-primary rounded-md hover:bg-light-secondary hover:text-light-primary-alt" + " " + classes}>{text}</a>
    )
}