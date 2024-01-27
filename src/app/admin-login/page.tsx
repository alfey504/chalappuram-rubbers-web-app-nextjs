
import { Footer } from "@/components/footer";
import { NavBar } from "@/components/navbar";

import { LoginSection } from "./client-components";


export default function AdminLogin() {
    return (
        <div>
            <NavBar />
            <LoginSection className="mt-32"/>
            <Footer className="mt-24"/>
        </div>
    )
}
