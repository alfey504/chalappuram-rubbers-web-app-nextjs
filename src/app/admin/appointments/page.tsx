import { Footer } from "@/components/footer";
import { AdminNavBar } from "@/components/navbar";
import { useState } from "react";
import { AppointmentsSection } from "./client-componets";

export default function Appointments(){
    return(
        <main>
            <AdminNavBar />
            <AppointmentsSection className="mx-44 my-10"/>
            <Footer />
        </main>
    )
}

