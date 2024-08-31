import { auth } from "@/auth"
import { Session } from "next-auth"
import { redirect } from "next/navigation"
import HomePage from "./homepage"

// page ini cuma buat checking session
export default async function MainPage() {
    const session = await auth() as Session

    if (!session) {
        redirect('/')  // Redirect to login if there's no session
    }

    return <HomePage />
}