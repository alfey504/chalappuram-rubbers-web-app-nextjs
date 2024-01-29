import { CustomSubmitButton } from "@/components/custom-submit-button";
import { Footer } from "@/components/footer";
import { AdminNavBar } from "@/components/navbar";
import { Appointment, getUnapprovedAppointments } from "./actions";
import { AppointmentBox } from "./client-componets";

export default function AppointmentRequests(){
    return (
        <main>
            <AdminNavBar />
            <AppointmentList className=" mt-10 mx-5 xxs:mx-10 sm:mx-16 lg:mx-72"/>
            <Footer className="mt-10"/>
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
                {appointments?.map((appointment, i)=>{
                    return <AppointmentBox className="my-3" appointment={appointment} key={i}/>
                })}
            </div>
        </div>
    )
}


