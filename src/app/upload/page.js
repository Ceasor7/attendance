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
        <div className='flex justify-center items-center mx-auto flex-col sm:flex-row gap-y-8 gap-x-7'>
        <button
          onClick={handleAddData}
          className="bg-green-700 text-white px-8 w-52 py-3 rounded-xl"
        >
          Submit data
        </button>
        <Link
            href="/crud"
            className="bg-red-500 px-8 w-52 text-center py-3 text-white rounded-xl"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
