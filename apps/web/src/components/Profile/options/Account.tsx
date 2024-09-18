import { useAppSelector } from '@/app/redux/hooks';
import Link from 'next/link';

export default function Profile() {
  const user = useAppSelector((state) => state.author);
  return (
    <div className="flex flex-col justify-between items-center w-full">
      <div>
        <p className='text-black underline text-lg'>Account</p>
      </div>

      <div className="grid grid-flow-row gap-5 p-5 m-2 text-center">
        <Link
          className="p-2 border-solid rounded-lg border-black border-2 hover:text-black duration-500"
          href={'/edit/changeName'}
        >
          Change Name
        </Link>

        <Link
          className="p-2 border-solid rounded-lg border-black border-2 hover:text-black duration-500"
          href={'/edit/changeEmail'}
        >
          Change Email
        </Link>

        <Link
          className="p-2 border-solid rounded-lg border-black border-2 hover:text-black duration-500"
          href={'/edit/changePassword'}
        >
          Change Password
        </Link>
        {user.role !== 'ORGANIZER' && (
          <Link
            className="p-2 border-solid rounded-lg border-black border-2 hover:text-black duration-500"
            href={'/edit/becomeOrganizer'}
          >
            Become an Organizer
          </Link>
        )}

        <Link
          className="p-2 border-solid rounded-lg border-black border-2 hover:text-black duration-500"
          href={'/edit/deleteAccount'}
        >
          Delete Account
        </Link>
      </div>
    </div>
  );
}
