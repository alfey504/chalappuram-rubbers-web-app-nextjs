"use server"

import { ApiService } from "@/utils/api-services"
import { GetAuthToken } from "@/utils/auth-token-cookie"

export type Appointment = {
    Id : number
    FullName: string
    Email: string
    AppointmentDate: string,
    AppointmentTime: string,
    Approved: string
}

export const getAppointmentByDate = async (date: string) => {
    try {
        const apiService = new ApiService()
        const token = GetAuthToken()
        const response = await apiService.get("admin/appointment/date", {"date": date}, token, "no-cache")
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