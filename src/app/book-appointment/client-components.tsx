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
        return <Success message={(state.message == undefined)? "A verification email has been sent to your email. Please check your email": state.message }/>
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
                <label className=" font-semibold"> Full Name : </label>
                <input className="w-64 border-2 p-1 border-light-primary mt-1 rounded-md" type="text"  name="fullName" required={true}/> 
                <label className="mt-5 font-semibold"> Email : </label>
                <input className="w-64 border-2 p-1 border-light-primary mt-1 rounded-md" type="email" name="email"  required={true}/> 
                <label className="mt-5 font-semibold">Date : </label>
                <input className="w-64 border-2 p-1 border-light-primary mt-1 rounded-md" onChange={(t)=>{setDate(t.target.value)}} type="date" name="date" required={true} min={minDate}/> 
                <label className="mt-10 font-semibold">Pick a time slot : </label>
                {loading == false &&
                    <TimeSlotPicker className="mt-1" timeSlots={timeSlots} name="timeSlot" />
                }{loading == true &&
                    <div className="mt-3">Loading...</div>
                }{date == "" &&
                    <div className="mt-3">Please select a date ..</div>
                }
                <Warning className="mt-10" message={state.message}/>
                <BookAppointmentButton className="mt-10 ml-0 md:ml-0"/>
            </form>
        </div>
    )
}

const BookAppointmentButton = ({
    className
}:{
    className?: string
}) => {
    const { pending } = useFormStatus()
    if(pending){
        return <div className={className?? " " + " text-light-primary"}>Requesting appointment..</div>
    }
    return <CustomSubmitButton className={className ?? ""} text="Request Appointment" />
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
        <div className="flex flex-col justify-center items-center w-full h-full mt-56 mb-64">
            <span className="text-light-primary font-bold md:text-2xl text-center w-screen mx-5">A verification email has been sent to your email. Please check your email</span>
            <span className="text-light-primary  text-center w-screen mt-5 mx-5">Note if the email is not verified by the end of the day the appointment will be canceled</span>
            <a href="\" className="text-light-primary text-center underline mt-5">Go to homepage</a>
        </div>
    )
}

