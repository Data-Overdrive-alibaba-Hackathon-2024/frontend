// import { auth } from "@/auth"
'use client'
import { Session } from "next-auth"
import { redirect } from "next/navigation"
import HomePage from "./homepage"
import useAuth from "@/hooks/useAuth"
import { useRouter } from "next/router"
import { useEffect } from "react"

export default function MainPage() {

    useAuth()

    return <HomePage />
}