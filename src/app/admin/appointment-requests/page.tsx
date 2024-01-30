import { CustomSubmitButton } from "@/components/custom-submit-button";
import { Footer } from "@/components/footer";
import { AdminNavBar } from "@/components/navbar";
import { Appointment, getUnapprovedAppointments } from "./actions";
import { AppointmentBox } from "./client-componets";

export default function AppointmentRequests(){
    return (
        <main className=" min-h-screen">
            <AppointmentList className=" mt-10 mx-5 xxs:mx-10 sm:mx-16 lg:mx-72"/>
        </main>
    )
}

const AppointmentList = async ({ 
    className 
}:{ 
    className?: string 
}) => {
    const appointments = await getUnapprovedAppointments()
    console.log(appointments)
    return (
        <div className={className?? ""}>
            <div className="flex flex-col">
                {appointments == undefined && <div className="mt-5 text-light-primary text-lg text-center"> There was an issue loading appointments</div>}
                {appointments != undefined && appointments?.length <= 0 && 
                    <div className="mt-5 text-light-primary text-lg text-center"> There are no requests currently</div>
                }
                {appointments?.map((appointment, i)=>{
                    return <AppointmentBox className="my-3" appointment={appointment} key={i}/>
                })}
            </div>
        </div>
    )
}


