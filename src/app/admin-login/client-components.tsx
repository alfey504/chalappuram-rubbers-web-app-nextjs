"use client"

import { useFormState, useFormStatus } from "react-dom"
import { Login } from "./actions"
import { CustomSubmitButton } from "@/components/custom-submit-button"

export const LoginSection = ({
    className,
}:{
    className?: string
}) => {     
    const [state, formAction] = useFormState(Login, "")

    return (
        <div className={ "flex justify-center w-screen " + className ?? ""} >
            <form className="border-light-primary border-2 w-10/12 items-center flex flex-col rounded-xl xxs:w-7/12 xs:w-6/12 sm:w-6/12 md:w-5/12 lg:w-4/12 xl:w-3/12" action={formAction}>
                <span className="text-light-primary text-xl font-bold mt-10">Admin Login</span>
                <div className="flex flex-col mt-5">
                    <label>Username: </label>
                    <input className="w-52 border-2 p-1 border-light-primary mt-1" type="text"  name="username" required={true}/> 
                </div> 
                <div className="flex flex-col mt-5">
                    <label>Password: </label>
                    <input className="w-52 border-2 p-1 border-light-primary mt-1" type="password"  name="password" required={true}/> 
                </div>
                { state != "" && <div className="text-light-primary mt-2 text-sm">*{state}</div> }
                <LoginSubmitButton className="mt-10 mb-10" />
            </form>
        </div>
    )
}

const LoginSubmitButton = ({
    className,
}: {
    className?: string
}) => {
    const { pending } = useFormStatus()
    if(pending){
        return <div className={ "text-light-primary text-lg mt-10 mb-10"} >Logging you in ...</div>
    }
    return <CustomSubmitButton disabled={pending} className={className ?? ""} text="login"/>
}
