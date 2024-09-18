'use client';

import { useAppSelector } from '@/app/redux/hooks';
import { deleteToken, getToken } from '@/lib/server';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function NavLog() {
  const [token, setToken] = useState('');
  const Router = useRouter();
  const getData = async () => {
    const res = await getToken();
    setToken(res || '');
  };

  const user = useAppSelector((state) => state.author);
  

  const onLogout = async () => {
    await deleteToken();
    setToken('');
    Router.push('/');
  };

  useEffect(() => {
    getData();
  }, [token]);

  return (
    <div>
      {token ? (
        <div className="flex justify-around gap-2 items-center">
          <Link href={'/user'}>
            {user.avatar !== null ? (
              <img
                src={user.avatar}
                alt="avatar"
                className="w-10 h-10 rounded-full"
              />
            ) : (
              <img
                src="/avatar/default.jpg"
                alt="avatar"
                className="w-10 h-10 rounded-full"
              />
            )}
          </Link>
          <div onClick={onLogout} className="cursor-pointer">
            Logout
          </div>
        </div>
      ) : (
        <div className="flex justify-around gap-2">
          <Link href={'/login'}>Login</Link>
          <Link href={'/register'}>Register</Link>
        </div>
      )}
    </div>
  );
}
