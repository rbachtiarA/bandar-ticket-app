import { IRegister } from "@/type/user"



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