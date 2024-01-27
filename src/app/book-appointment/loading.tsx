import { ReactElement } from "react";
import BookAppointment from "./page";
import { NavBar } from "@/components/navbar";
import { AppointmentForm } from "./client-components";
import { Footer } from "@/components/footer";


export default function BookAppointmentLoading(): ReactElement {
    return (
        <main>
            <NavBar />
            <div>Loading ..</div>
            <Footer className="mt-20"/>
        </main>
    )
}