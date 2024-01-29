"use client"

import { CustomButton, CustomSubmitButton } from "@/components/custom-submit-button"
import { Appointment, ApproveAppointment } from "./actions"
import { useState } from "react"

export const AppointmentBox = ({
    className,
    appointment,
}:{
    appointment: Appointment
    className?: string
}) => {
    const [ loading, setLoading ] = useState(false)

    const onApproveClicked = async () => {
        setLoading(true)
        const response = await ApproveAppointment(appointment.Id)
        if(response == false){
            alert("There was an issue approving the appointment try again")
        }
        setLoading(false)
    }   

    if(loading){
        return (
            <div className={className?? ""}>
                <div className=" flex flex-col xxs:flex-row border-light-primary border-2 rounded-xl px-48 py-48 xxs:px-12 xxs:py-6 justify-between">
                    <span>Loading...</span>
                </div>
            </div>
        )
    }

    return(
        <div className={className?? ""}>
            <div className=" flex flex-col xxs:flex-row border-light-primary border-2 rounded-xl px-4 py-2 xxs:px-12 xxs:py-6 justify-between">
                <div className="flex flex-col justify-start self-start">
                    <span className="md:text-lg">{appointment.FullName}</span>
                    <span className="md:text-lg">{appointment.AppointmentDate + " " +appointment.AppointmentTime}</span>
                </div>
                <div className="flex flex-col items-end justify-end self-end mt-4 xxs:mt-0">
                    <CustomButton text="approve" onClick={onApproveClicked}/>
                </div>
            </div>
        </div>
    )
}
