import Link from 'next/link';

export default function Home() {
  return (
    <div className="mt-24">
      <p className="text-3xl font-bold text-center">Select an option</p>
      <div className="flex flex-row justify-center items-center gap-5 mt-10">
        <div>
          <a className="bg-red-700 px-7 py-3 rounded-lg text-white">
            <Link href="/upload"> Upload Data</Link>
          </a>
        </div>
        <div>
          <a className="bg-green-700 px-7 py-3 rounded-lg text-white">
            <Link href="/fetch">Mark Attendance</Link>
          </a>
        </div>
      </div>
    </div>
  );
}
