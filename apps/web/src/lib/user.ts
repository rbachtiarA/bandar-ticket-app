import { IEditEmail, IEditName, IEditPassword, ILogin, IRegister } from "@/type/user"


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

// user.ts
export const getUserData = async (token: string) => {
    const res = await fetch('http://localhost:8000/api/user/get-user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
  
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
  
    const result = await res.json();
    return {result, ok: res.ok};
  };
  

export const verifyEmail = async (token:string) =>{
    const res = await fetch(`http://localhost:8000/api/user/verify/${token}`,{
        method: 'GET',
        headers:{
            "Authorization": `Bearer ${token}`
    }})
    const result = await res.json()
    return{result, ok: res.ok}

}

export const editName = async (id: string, data: IEditName, token: string) => {
    const res = await fetch(`http://localhost:8000/api/user/name/${id}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        },
    });
    const result = await res.json();
    return {result, ok: res.ok};
};

export const editPassword = async (id: string, data: IEditPassword, token: string) => {
    const res = await fetch(`http://localhost:8000/api/user/password/${id}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        },
    });
    const result = await res.json();
    return {result, ok: res.ok};
};

export const editEmail = async (id: string, data: IEditEmail, token: string) => {
    const res = await fetch(`http://localhost:8000/api/user/email/${id}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        },
    });
    const result = await res.json();
    return {result, ok: res.ok};
};

export const becomeOrganizer = async (id: string, token: string) => {
    const res = await fetch(`http://localhost:8000/api/user/organizer/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        },
    });
    const result = await res.json();
    return {result, ok: res.ok};
};

export const deleteAccount = async (id: string, token: string) => {
    const res = await fetch(`http://localhost:8000/api/user/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        },
    });
    const result = await res.json();
    return {result, ok: res.ok};
}