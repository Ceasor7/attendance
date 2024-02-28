import Link from 'next/link';

export default function Home() {
  return (
    <div className="mt-24">
      <p className="text-3xl font-bold text-center">Select an option</p>
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
