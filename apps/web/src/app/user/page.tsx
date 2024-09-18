import UserProfile from "@/components/Profile/UserProfile";
import Wrapper from "@/components/wrapper";
import { Suspense } from "react";

export default function User(){
    return(
        <Wrapper>
            <div className="flex justify-center w-full">
                <Suspense>
                    <UserProfile />
                </Suspense>
            </div>
        </Wrapper>
    )
}