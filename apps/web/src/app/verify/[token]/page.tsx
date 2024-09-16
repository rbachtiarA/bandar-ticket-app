'use client'

import { verifyEmail } from "@/lib/user"
import { useParams } from "next/navigation"
import { off } from "process"
import { useEffect } from "react"
import { toast } from "react-toastify"

export default function VerifyPage(){
  const params = useParams<{ token : string }>()
  const onVerify = async () =>{
    try {
      const{result, ok} = await verifyEmail(params.token)
      if(!off) throw result.msg
      toast.success('Verification Success')
    } catch (error) {
      toast.error(error as string)
    }
  }
  
  useEffect(() =>{
    console.log(params)
    onVerify()
  }, [])
  
  return(
    <div className="flex h-full justify-center items-center">
      <h1>Verification Page</h1>
    </div>
  )
}