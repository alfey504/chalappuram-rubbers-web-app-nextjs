"use server"

import { ApiService } from "@/utils/api-services"
import { GetAuthToken } from "@/utils/auth-token-cookie"
import { revalidatePath } from "next/cache"
import { cache } from "react"

export type Appointment= {
    Id: number,
    FullName: string,
    Email: string,
    AppointmentDate: string,
    AppointmentTime: string,
    Approved: string
}

export const getUnapprovedAppointments = async () => {
    try{
        const apiService = new ApiService()
        const token = GetAuthToken()
        const response = await apiService.get("admin/appointment/unapproved", undefined, token, "no-cache")
        if(!response.ok){
            const responseData = await response.json()
            console.log(responseData)
            return undefined
        }
        const responseData = await response.json()
        const data: Appointment[] = responseData.Data.data
        return data
    }catch(e: any){
        console.log(e)
        return undefined
    }
}

export const ApproveAppointment = async (id: number) => {
    try {
        const apiService = new ApiService()
        const token = GetAuthToken()
        const data = {
            id: id,
            approved: true
        }
        const response = await apiService.put("admin/appointment", {} ,data,"no-store", token)
        if(!response.ok){
            const responseData = await response.json()
            console.log("response : " + responseData.Message)
            return false
        }
        const responseData = await response.json()
        console.log("response : " + responseData.Message)
        revalidatePath("/")
        return true 
    }catch(e: any){
        console.log(e)
        return false
    }
}