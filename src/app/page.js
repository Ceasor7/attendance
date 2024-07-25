'use client';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { auth } from './firebaseConfig';

export default function Home() {
  const [user, setUser] = useState(null);
  const provider = new GoogleAuthProvider();
  const router = useRouter();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result);
        router.push('/crud');
      })
      .catch((error) => {
        addLog(error.message);
      });
  };

  return (
    <main className="min-h-screen mx-auto max-w-4xl flex items-center justify-center">
      <div className="flex items-center justify-center">
        <button
          className="flex flex-row gap-6 w-96 items-center justify-center border-2 px-4 py-2 rounded-md bg-slate-800"
          onClick={() => {
            signInWithGoogle();
          }}
        >
          <Image src="/google.svg" alt="Google icon" height={20} width={20} />
          <p className="text-white">Sign in with Google</p>
        </button>
      </div>
    </main>
  );
}
