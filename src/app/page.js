import Link from 'next/link';

export default function Home() {
  return (
    <div className="mt-24">
      <p className="text-center">
        <span className="font-bold">CAUTION:</span> Please be extra careful when
        confirming the attendance, when confirmed the action cannot be reversed{' '}
      </p>
      <div className="flex flex-row justify-center items-center gap-5 mt-10">
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
}
