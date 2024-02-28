'use client';
import { push, ref, set } from 'firebase/database';
import Link from 'next/link';
import { useState } from 'react';
import { database } from '../firebaseConfig';

export default function UploadData() {
  const [fname, setFname] = useState('');

  const handleAddData = () => {
    try {
      const attendantRef = ref(database, 'attendant');
      const newDataRef = push(attendantRef);

      set(newDataRef, {
        fname: fname,
      });

      setFname('');
      alert('Attendant added successfully!!');
    } catch (error) {
      console.error('Firebase Error:', error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center p-12">
      <h3 className="text-4xl font-bold text-center my-10">
        Add Attendant Data to the Database
      </h3>
      <div className="mb-4 flex flex-col">
        <input
          type="text"
          placeholder="Full Name"
          value={fname}
          onChange={(e) => setFname(e.target.value)}
          className="border w-80 p-2 mb-4"
        />
        <button
          onClick={handleAddData}
          className="bg-green-700 text-white p-2 rounded-lg"
        >
          Submit data
        </button>
        <Link
          href="/"
          className="bg-red-700 text-white p-2 mt-2 text-center rounded-lg"
        >
          Home
        </Link>
      </div>
    </div>
  );
}
