"use client"

import { CustomSubmitButton } from "@/components/custom-submit-button"
import { SendMessage } from "./actions"
import { ReactNode, useState } from "react"
import { useFormState, useFormStatus } from "react-dom"
import { FormStateType } from "../book-appointment/client-components"

const initialState: FormStateType = {
    success: false,
    message: undefined
}

export const MessageUs = ({
    className,
}: {
    className?: string,
}): ReactNode => {

    const [ state, formAction ] = useFormState(SendMessage, initialState)


    if(state.success){
        return (
            <div className="flex flex-col justify-center items-center mt-10 mb-28">
                <span className="text-light-primary text-xl text-bold text-center">We have received your message.</span>
                <span className="text-light-primary text-center"> We will write back to the provided email</span>
            </div>
        )
    }

    return (
        <div className={className ?? ""}>
            <span className="p-3 text-2xl font-bold text-light-primary">Message Us</span>
            <form className=" flex flex-col mt-10" action={formAction} >
                <div className="flex flex-col lg:flex-row">
                    <label className=" align-middle p-3 w-44 ">Name : </label>
                    <input className=" p-3 w-72 border-2 border-light-primary rounded-md lg:w-96" type="text" placeholder="name" name="name" required={true}/>
                </div>
                <div className="flex flex-col lg:flex-row mt-10">
                    <label className=" align-middle p-3 w-44 ">Email : </label>
                    <input className=" p-3 w-72 border-2 border-light-primary rounded-md lg:w-96" type="email" placeholder="email" name="email" required={true}/>
                </div>
                <div className="flex flex-col mt-8 lg:flex-row">
                    <label className="align-middle p-3 w-44 ">Message : </label>
                    <textarea className="p-3 w-72 h-36 border-2 border-light-primary rounded-md lg:w-96" placeholder="message" name="message" required={true} />
                </div>
                {state.message != undefined &&
                    <span className="mt-5 lg:ml-44 text-light-primary">*{state.message}</span>
                }
                <SubmitMessageButton className="mt-10 ml-20 lg:ml-72"/>
            </form>
        </div>
    )
}

const SubmitMessageButton = ({
    className
}: {
    className?: string
}) => {
    const { pending } = useFormStatus()
    if(pending){
        return <div className={className ?? ""}>Sending message...</div>
    }
    return<CustomSubmitButton text="Send" className={className ?? ""}/>
}