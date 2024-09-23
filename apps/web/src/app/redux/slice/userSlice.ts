import { IBecomeOrganizer, IEditEmail, IEditName, IUser } from "@/type/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IUser = {
    id:0,
    name: '',
    email: '',
    role: '',
    avatar: '',
    points: 0,
    referCode: '',
    createdAt: '',
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        loginAction: (state, action: PayloadAction<IUser>) => {
            const { id, name, email, role, avatar, referCode, points, createdAt } = action.payload

            state.id = id
            state.name = name
            state.email = email
            state.role = role
            state.avatar = avatar
            state.referCode = referCode
            state.points = points
            state.createdAt = createdAt
        },
        logoutAction: (state) => {
            state.id = 0
            state.name = ''
            state.email = ''
            state.role = ''
            state.avatar = ''
            state.referCode = ''
            state.points = 0
            state.createdAt = ''
            
        },
        nameAction: (state, action: PayloadAction<IEditName>) =>{
            const {name} = action.payload

            state.name = name
        },

        emailAction: (state, action: PayloadAction<IEditEmail>) =>{
            const {email} = action.payload

            state.email = email
        },

        roleAction: (state, action: PayloadAction<IBecomeOrganizer>) =>{   
            const {role} = action.payload

            state.role = role
        },

        deleteAction: (state) => {
            state.id = 0
            state.name = ''
            state.email = ''
            state.role = ''
            state.avatar = ''
            state.referCode = ''
            state.points = 0
            state.createdAt = ''
            
        }
    }
})

export const {loginAction, logoutAction, nameAction, emailAction, roleAction, deleteAction} = userSlice.actions
export default userSlice.reducer