"use client"

import { useFormState, useFormStatus } from "react-dom"
import { Login } from "./actions"
import { CustomSubmitButton } from "@/components/custom-submit-button"
import { redirect } from "next/navigation"

export const LoginSection = ({
    className,
}:{
    className?: string
}) => {     
    const [state, formAction] = useFormState(Login, {success: false, message: ""})
    const { pending } = useFormStatus()

    const { success, message } = state

    if (success){
        redirect("/admin")
    }

    if(pending){
        return <Loading className={className}/>
    }

    return (
        <div className={ "flex justify-center w-screen " + className ?? ""} >
            <form className="border-light-primary border-2 w-4/12 items-center flex flex-col rounded-xl" action={formAction}>
                <span className="text-light-primary text-xl font-bold mt-10">Admin Login</span>
                <div className="flex flex-col mt-5">
                    <label>Username: </label>
                    <input className="w-52 border-2 p-1 border-light-primary mt-1" type="text"  name="username" required={true}/> 
                </div> 
                <div className="flex flex-col mt-5">
                    <label>Password: </label>
                    <input className="w-52 border-2 p-1 border-light-primary mt-1" type="password"  name="password" required={true}/> 
                </div>
                <div className="text-light-primary mt-2 text-sm">*{message}</div>
                <CustomSubmitButton className="mt-10 mb-10" text="Login"/>
            </form>
        </div>
    )
}

const Loading = ({
    className,
}:{
    className?: string
}) => {
    return (
        <div className={ "flex justify-center w-screen " + className ?? ""} >
            <span className="text-xl text-light-primary font-bold">Logging you in please wait...</span>
        </div>
    )
} 