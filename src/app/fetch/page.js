'use client';
import { get, ref, set } from 'firebase/database';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { database } from '../firebaseConfig';

const FetchData = () => {
  const [attendants, setAttendants] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const attendantRef = ref(database, 'attendant');
    get(attendantRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const attendantArray = Object.entries(snapshot.val()).map(
            ([id, data]) => ({
              id,
              ...data,
            })
          );
          setAttendants(attendantArray);
        } else {
          console.log('No data available');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleConfirmAttendance = (id) => {
    const updatedAttendants = attendants.map((attendant) =>
      attendant.id === id ? { ...attendant, confirmed: true } : attendant
    );
    setAttendants(updatedAttendants);
    const attendantRef = ref(database, `attendant/${id}`);
    set(attendantRef, { ...updatedAttendants.find((a) => a.id === id) });
  };

  const filteredAttendants = attendants.filter((attendant) =>
    attendant.fname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggleCheckbox = (id) => {
    const updatedAttendants = attendants.map((attendant) =>
      attendant.id === id
        ? { ...attendant, checked: !attendant.checked }
        : attendant
    );
    setAttendants(updatedAttendants);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold text-center my-10">
        Take attendance record
      </h1>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <Link href="/" className="bg-red-500 px-8 py-3 text-white rounded-xl">
            Home
          </Link>
        </div>
        <div className="flex flex-row">
          <p className="items-center justify-center text-center flex">Search</p>
          <input
            type="text"
            placeholder="Search by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 border ml-3 border-gray-300 rounded-md focus:outline-none focus:border-green-500"
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {filteredAttendants.map((attendant) => (
          <div key={attendant.id} className="bg-gray-100 p-4 rounded-lg">
            <div className="flex flex-row">
              <h2 className="text-xl text-gray-900">{attendant.fname}</h2>
            </div>
            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                id={`confirm-${attendant.id}`}
                onChange={() => handleToggleCheckbox(attendant.id)}
                checked={attendant.checked}
                disabled={attendant.confirmed}
              />
              <label
                htmlFor={`confirm-${attendant.id}`}
                className="ml-2 text-black"
              >
                Confirm Attendance
              </label>
            </div>
            <button
              className="mt-2 py-2 px-4 bg-green-500 text-white rounded disabled:opacity-50"
              onClick={() => handleConfirmAttendance(attendant.id)}
              disabled={attendant.confirmed || !attendant.checked}
            >
              Confirmed
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FetchData;
