import { useAppSelector } from '@/app/redux/hooks';

export default function Profile() {
  const user = useAppSelector((state) => state.author);
  return (
    <div className="flex flex-col justify-between items-center w-full">
      <div>
        <p className="text-black underline text-lg">Profile</p>
      </div>

      <div className="grid grid-cols-2 grid-flow-row gap-5 p-5 m-2">
        <div className="text-black">Name:</div>
        <div>{user.name}</div>
        <div className="text-black">Email:</div>
        <div>{user.email}</div>
        <div className="text-black">Account Type:</div>
        <div>{user.role}</div>
        <div className="text-black">Refer Code:</div>
        <div>{user.referCode}</div>
      </div>
    </div>
  );
}
