import { useAppSelector } from "@/app/redux/hooks"

export default function Profile(){
    const user = useAppSelector((state) => state.author);
    return(
        <div className="flex flex-col justify-between items-center w-full">
            <div>
                <p>Profile</p>
            </div>
            
            <div className="grid grid-cols-2 grid-flow-row gap-5 p-5 m-2">
                <div>Name:</div>
                <div>{user.name}</div>
                <div>Email:</div>
                <div>{user.email}</div>
                <div>Account Type:</div>
                <div>{user.role}</div>
                <div>Refer Code:</div>
                <div>{user.referCode}</div>
                
            </div>
        </div>
    )
}