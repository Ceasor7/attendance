'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { auth } from '../firebaseConfig';

const page = () => {
  const [username, setUsername] = useState('');
  const router = useRouter();

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUsername(user.displayName);
    } else {
      router.push('/');
    }
  }, []);

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        router.push('/');
      })
      .catch((error) => {
        console.error('Logout error:', error);
      });
  };

  return (
    <div className="container min-h-screen mx-auto max-w-4xl mt-24">
      <div className="flex-col justify-center items-center flex sm:flex-row gap-5 mb-7">
        <div className="flex items-center justify-center gap-x-2 flex-row">
          <h1 className="text-xl">Welcome</h1>
          <p className="text-2xl italic font-bold"> {username}</p>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 w-56 bg-red-600 text-white rounded-md"
        >
          Logout
        </button>
      </div>
      <p className="text-center">
        <span className="font-bold">CAUTION:</span> Please be extra careful when
        confirming the attendance, when confirmed the action cannot be reversed{' '}
      </p>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-x-5 gap-y-8 mt-10">
        <div>
          <Link
            href="/upload"
            className="bg-red-700 px-7 py-3 rounded-lg text-white"
          >
            {' '}
            Upload Data
          </Link>
        </div>
        <div>
          <Link
            href="/fetch"
            className="bg-green-700 px-7 py-3 rounded-lg text-white"
          >
            Mark Attendance
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
