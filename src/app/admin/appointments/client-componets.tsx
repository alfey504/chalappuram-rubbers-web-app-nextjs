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
                <label className="text-lg">Date :</label>
                <input className="border-2 border-light-primary rounded-md w-1/4 text-xl px-2 py-2 mt-4" type="date" defaultValue={todaysDate} onChange={(e)=>{setDate(e.target.value)}}/>
            </div>
            {loading &&
                <div className="mt-10"> Loading.. </div>
            }
            {!loading &&
                <AppointmentListSection appointments={appointmentList} className="mt-7"/>
            }
            {!loading && appointmentList.length <= 0 &&
                <div className="mt-10"> There are no appointments on {date} </div>
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
            <div className="flex flex-row px-4 py-4 border-2 border-light-primary my-4 rounded-md justify-between text-lg"> 
                <span className="w-1/2 text-left">{appointment.FullName}</span>
                <span className="w-1/2 text-center">{appointment.Email}</span>
                <span className="w-1/2 text-right">{appointment.AppointmentTime}</span>
            </div>
        </div>
    )
}