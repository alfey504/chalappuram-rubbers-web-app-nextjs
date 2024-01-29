"use server"

import { ApiService } from "@/utils/api-services"
import { GetAuthToken } from "@/utils/auth-token-cookie"
import { revalidatePath } from "next/cache"

export const messageRead = async (id: number) => {
    try {
        const apiService = new ApiService() 
        const token = GetAuthToken()
        const response  =  await apiService.put("admin/message", {id: id, read: true}, undefined, token)
        if(!response.ok){
            console.log(response)
            return
        }
        const responseData = await response.json()
        console.log(responseData)
        revalidatePath("/")
    }catch(e){
        console.log(e)
    }
}