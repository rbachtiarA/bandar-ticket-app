'use client'

import { verifyEmail } from "@/lib/user"
import { useParams, useRouter } from "next/navigation"
import { useEffect } from "react"
import { toast } from "react-toastify"


export default function VerifyPage(){
  const params = useParams()
  const token = Array.isArray(params?.token) ? params.token[0] : params?.token;
  const router = useRouter()
  const onVerify = async () =>{
    if(!token){
      toast.error('token not found')
      return;
    }
    try {
      const{result, ok} = await verifyEmail(token)
      if(!ok) throw result.msg
      toast.success('Verification Success')
      router.push('/login')
    } catch (error) {
      toast.error(error as string)
    }
  }
  
  useEffect(() =>{
    onVerify()
  }, [token])
  
  return(
    <div className="flex h-full justify-center items-center">
      <h1>Verification In Progress</h1>
    </div>
  )
}