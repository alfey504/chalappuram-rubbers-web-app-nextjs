"use client"

import { useEffect, useState } from "react"
import { Appointment, getAppointmentByDate } from "./action"

export const AppointmentsSection = ({
    className,
}: {
    className?: string
}) => {

    const todaysDate = function() {
        const today = new Date()
        const year = today.getFullYear()
        const month = (today.getMonth() + 1).toString().padStart(2, '0');
        const day = today.getDate().toString().padStart(2, '0')
        return `${year}-${month}-${day}`
    }()

    const [ date, setDate ] = useState(todaysDate)
    const [ appointmentList, setAppointmentList ] = useState<Appointment[]>([])
    const [ loading, setLoading ] = useState(false)


    useEffect(() => {
        getAppointments()
    }, [date])

    const getAppointments = async () => {
        setLoading(true)
        const appointments = await getAppointmentByDate(date)
        console.log(appointments)
        if(appointments == undefined){
            setAppointmentList([])
            setLoading(false)
            return
        }
        setAppointmentList(appointments)
        setLoading(false)
    }

    return (
        <div className={className ?? ""}>
            <div className="flex flex-col">
                <label className="text-lg text-light-primary font-bold">Date :</label>
                <input className="border-2 border-light-primary rounded-md w-1/2 sm:w-1/3 lg:1/4 text-xl px-2 py-2 mt-4" type="date" defaultValue={todaysDate} onChange={(e)=>{setDate(e.target.value)}}/>
            </div>
            {loading &&
                <div className="mt-10 text-light-primary"> Loading.. </div>
            }
            {!loading &&
                <AppointmentListSection appointments={appointmentList} className="mt-7"/>
            }
            {!loading && appointmentList.length <= 0 &&
                <div className="mt-10 text-light-primary"> There are no appointments on {date} </div>
            }
        </div>
    )
}

const AppointmentListSection = ({ 
    className,
    appointments,
}:{
    className?: string,
    appointments: Appointment[]
}) => {
    return (
        <div className={className ?? ""}>
            {appointments.map((appointment, i)=>{
                return <AppointmentBox appointment={appointment} key={i}/>
            })}
        </div>
    )
}


const AppointmentBox = ({
    className,
    appointment
}: {
    appointment: Appointment,
    className?: string,
}) => {
    return (
        <div className={className ?? "" }>
            <div className="flex flex-col lg:flex-row px-4 py-4 border-2 border-light-primary my-4 rounded-md justify-between text-lg "> 
                <div className="flex flex-col justify-center w-1/3">
                    <div className="flex flex-col items-start">
                        <div className="mr-2 text-light-primary font-bold">Name : </div>
                        <span className="text-left md:text-left"> {appointment.FullName}</span>
                    </div>
                </div>
                <div className="flex flex-col mt-2 w-1/3 justify-center">
                    <div className="flex flex-col items-start">
                        <div className="mr-2 text-light-primary font-bold">Email : </div>
                        <span className="text-left md:text-left">{appointment.Email}</span>
                    </div>
                </div>
                <div className="flex flex-col mt-2 justify-center w-1/3">
                    <div className="flex flex-col items-start lg:items-end">
                        <div className="text-light-primary font-bold">Time:</div>
                        <span className="text-left md:text-left">{appointment.AppointmentTime}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}