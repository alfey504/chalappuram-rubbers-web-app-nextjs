"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const GetAuthToken = () => {
    const cookieStore = cookies()
    const cookie = cookieStore.get("AUTH_TOKEN")
    if(cookie == undefined) {
        redirect("/admin-login") 
    }
    return cookie.value
}