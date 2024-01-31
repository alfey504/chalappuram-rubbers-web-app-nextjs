import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AdminNavBar, NavBar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { ApiService } from '@/utils/api-services'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Chalappuram Rubbers Vennikulam Admin',
  description: 'Web app for Chalappuram Rubbers',
}

export default async function AdminRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
    await verifyToken()
    return (
        <html lang="en">
            <body className={inter.className}>
                <AdminNavBar />
                {children}
                <Footer className="mt-10"/>
            </body>
        </html>
    )
}

const verifyToken = async () => {
    const authToken = getToken()
    if(authToken == undefined){
        redirect("/admin-login")
        return
    }
    const isValidToken = await checkIfTokenIsValid(authToken.value)
    console.log(isValidToken)
    if(!isValidToken){
        redirect("/admin-login")
    }
}

const getToken = () => {
    const cookieStore = cookies()
    const token = cookieStore.get("AUTH_TOKEN")
    return token
}

const checkIfTokenIsValid = async (token: string) => {
    try {
        const apiService = new ApiService()
        const response = await apiService.get("admin/verify", {"token": token})
        console.log( await response.json())
        if(!response.ok){
            return false
        }
        return true 
    }catch(e: any){
        return false
    }
}