'use client';
import { get, ref, set } from 'firebase/database';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { auth, database } from '../firebaseConfig';

const FetchData = () => {
  const [attendants, setAttendants] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
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
          setTotalRecords(attendantArray.length);
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

  const checkedAndConfirmedAttendants = filteredAttendants.filter(
    (attendant) => attendant.checked && attendant.confirmed
  );

  const handleToggleCheckbox = (id) => {
    const updatedAttendants = attendants.map((attendant) =>
      attendant.id === id
        ? { ...attendant, checked: !attendant.checked }
        : attendant
    );
    setAttendants(updatedAttendants);
  };

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
    <div className=" container min-h-screen mx-auto max-w-6xl overflow-y-auto">
      <h1 className="text-4xl font-bold text-center my-10">
        Take attendance record
      </h1>
      <div className="flex flex-col justify-between sm:flex-row gap-10">
        <div className="flex items-center justify-center gap-x-4 flex-row">
          <h1 className="text-xl">Welcome</h1>
          <p className="text-2xl italic font-bold"> {username}</p>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded-md"
        >
          Logout
        </button>
      </div>
      <div className="text-center mb-4">Total Records: {totalRecords}</div>
      <div className="text-center mt-4">
        Checked and Confirmed Records: {checkedAndConfirmedAttendants.length}
      </div>
      <div className="mb-4 flex flex-col sm:flex-row items-center justify-between">
        <div className="mt-4">
          <Link
            href="/"
            className="bg-red-500 w-auto px-8 py-3 text-white rounded-xl"
          >
            Home
          </Link>
        </div>
        <div className="flex flex-col sm:flex-row mt-5 mb-3">
          <p className="items-center justify-center text-center flex">
            Search here
          </p>
          <input
            type="text"
            placeholder="Search by Name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 border sm:ml-3 border-gray-300 rounded-md focus:outline-none focus:border-green-500"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
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
              Confirm
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FetchData;
