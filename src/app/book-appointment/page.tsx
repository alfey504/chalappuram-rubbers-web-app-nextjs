
import { Footer } from "@/components/footer";
import { NavBar } from "@/components/navbar";
import { ReactElement } from "react";
import { AppointmentForm } from "./client-components";

export default async function BookAppointment(): Promise<ReactElement> {
    return (
        <main>
            <NavBar />
            <AppointmentForm className="mt-20 ml-10 mr-10 md:ml-52 md:mr-52"/>
            <Footer className="mt-20"/>
        </main>
    )
}
