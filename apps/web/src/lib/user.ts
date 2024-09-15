import { ILogin, IRegister } from "@/type/user"



export const registerUser = async (data: IRegister) =>{
    const res = await fetch('http://localhost:8000/api/user', {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
            "Content-Type": "application/json" //APPLICATION NOT APPPLICATION
        }
    })
    const result = await res.json()
    return{result, ok: res.ok}
}

export const checkEmail = async (email:string) =>{
    const res = await fetch(`http://localhost:8000/api/user/check-email`,{
        method: 'POST',
        body: JSON.stringify({email}),
        headers:{
            "Content-Type": "application/json"
        }
    })
    const result = await res.json()
    return result.exists
}

export const loginUser = async(data: ILogin) =>{
    const res = await fetch('http://localhost:8000/api/user/login',{
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
            "Content-Type": "application/json"
        }
    })
    const result = await res.json()
    return{result, ok: res.ok}
}

export const verifyEmail = async (token:string) =>{
    const res = await fetch('http://localhost:8000/api/user/verify',{
        method: 'PATCH',
        headers:{
            "Authorization": `Bearer ${token}`
    }})
    const result = await res.json()
    return{result, ok: res.ok}

}