import { ReactNode } from "react";

export const SeparatorLine = ({
    thickness,
}:{
    thickness: number
}): ReactNode => {

    return(
        <div className="bg-light-secondary w-screen" style={{height: thickness}}/>
    )
}