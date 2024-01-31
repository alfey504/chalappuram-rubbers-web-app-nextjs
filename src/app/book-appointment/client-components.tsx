"use client"

import { CustomSubmitButton } from "@/components/custom-submit-button"
import { TimeSlotPicker } from "@/components/time-slot-picker"
import { TimeSlot } from "@/utils/time-slot-manager"
import { ReactElement, useEffect, useState } from "react"
import { getTimeSlots, submitBookAssignment } from "./actions"
import { useFormState, useFormStatus } from "react-dom"

export type FormStateType = {
    message: string | undefined,
    success: boolean
}

const initialFormState: FormStateType = {
    message: undefined,
    success: false
}

export const AppointmentForm = ({
    className,
}:{
    className?: string,
}): ReactElement => {

    const [loading, setLoading ] = useState(false)
    const [ date, setDate ] = useState("")
    const [ timeSlots, setTimeSlots ] = useState<TimeSlot[]>([])
    const classes = (className == undefined)? "" : className

    const [state, formAction ] = useFormState( submitBookAssignment, initialFormState)
    const { pending } = useFormStatus()

    useEffect(()=>{
        if (date == ""){return}
        setLoading(true)
        const response = getTimeSlots(date)
        response.then((timeSlots)=>{
            if(timeSlots != undefined){
                setTimeSlots(timeSlots)
                setLoading(false)
            }
        }).catch((e)=>{
            setLoading(false)
        })
    }, [date])


    if (state.success){
        return <Success message={(state.message == undefined)? "Successfully request for appointment": state.message }/>
    }

    const minDate = function ():string{
        const date = new Date()
        date.setDate(date.getDate() + 1)
        return date.toISOString().split("T")[0]
    }()

    return(
        <div className={classes}>
            <span className="text-2xl text-light-primary font-bold">Book an Appointment</span>
            <form className="flex flex-col mt-10" action={formAction} >
                <label> Full Name : </label>
                <input className="w-52 border-2 p-1 border-light-primary mt-1" type="text"  name="fullName" required={true}/> 
                <label className="mt-10"> Email : </label>
                <input className="w-52 border-2 p-1 border-light-primary mt-1" type="email" name="email"  required={true}/> 
                <label className="mt-10">Date : </label>
                <input className="w-52 border-2 p-1 border-light-primary mt-1" onChange={(t)=>{setDate(t.target.value)}} type="date" name="date" required={true} min={minDate}/> 
                <label className="mt-10">Pick a time slot : </label>
                {loading == false &&
                    <TimeSlotPicker className="mt-1" timeSlots={timeSlots} name="timeSlot" />
                }{loading == true &&
                    <div className="mt-3">Loading...</div>
                }{date == "" &&
                    <div className="mt-3">Please select a date ..</div>
                }
                <Warning className="mt-10" message={state.message}/>
                <CustomSubmitButton disabled={pending} className="mt-10 ml-32 md:ml-0" text="Request Appointment" />
            </form>
        </div>
    )
}

const Warning = ({ message, className }:{ message?: string, className?: string}): ReactElement => {
    const classes = (className == undefined)? "" : className
    if(message == undefined){
        return <span></span>
    }else{
        return <div className={className}><span className="text-light-primary">*{message}</span></div>
    }
}

const Success = ({message}:{message: string}):ReactElement => {
    return (
        <div className="flex justify-center items-center w-full h-full mt-72 mb-64">
            <span className="text-light-primary text-3xl">{message}</span>
        </div>
    )
}

