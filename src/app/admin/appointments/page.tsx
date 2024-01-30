import { Footer } from "@/components/footer";
import { AdminNavBar } from "@/components/navbar";
import { useState } from "react";
import { AppointmentsSection } from "./client-componets";

export default function Appointments(){
    return(
        <main className=" min-h-screen h-full">
            <AppointmentsSection className="mx-3 my-10 lg:mx-44"/>
        </main>
    )
}

