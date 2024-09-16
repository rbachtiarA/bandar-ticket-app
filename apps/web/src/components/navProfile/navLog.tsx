'use client'

import { deleteToken, getToken } from "@/lib/server"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function NavLog(){
    const [token, setToken] = useState('')
    

    const onLogout = async ()=>{
        await deleteToken()
        setToken('')
    }

    useEffect(()=>{
        const readToken = async ()=>{
            const res = await getToken()
            setToken(res || '')
        }

        readToken()
    }, [])
    return(
        <div>
            {token ? (
                <div className='flex justify-around gap-2'>
                  <div>User</div>
                  <div onClick={onLogout} className='cursor-pointer'>Logout</div>
                </div>
              ) : (
                <div className='flex justify-around gap-2'>
                  <Link href={'/login'}>Login</Link>
                  <Link href={'/register'}>Register</Link>
                </div>
              )}
        </div>
    )
}