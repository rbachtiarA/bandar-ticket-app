'use client';

import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { deleteAction } from "@/app/redux/slice/userSlice";
import { deleteToken, getToken } from "@/lib/server";
import { deleteAccount } from "@/lib/user";
import { useRouter } from "next/navigation";

import { toast } from "react-toastify";

export default function DeleteAccount () {
    const user = useAppSelector((state) => state.author);
    const router = useRouter();
    const dispatch = useAppDispatch();
    const deletingAccount = async () => {
        try {
            const token = await getToken();
            const { result, ok } = await deleteAccount(
                String(user.id),
                token as string,
            );
            deleteToken();
            if (!ok) throw result.msg;
            dispatch(deleteAction());
    
            toast.success(result.msg);
    
            router.push('/');
        } catch (error) {
            console.log(error);
            toast.error(error as string);
        }
    }
    return(
        <div className=" min-w-[30vw]">
        <h2 className="text-base font-semibold leading-7 text-gray-900 w-full text-center">
          Deleting Account
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600 w-full text-center">
          With a push of a button, this account will be deleted permanently.
        </p>
        
        <button
          type="submit"
            onClick={deletingAccount}
          className="w-full mt-6 p-1.5 text-sm font-medium rounded-md bg-orange-500 "
        >
          Delete
        </button>
      </div>
    )
}