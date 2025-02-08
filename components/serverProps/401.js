import Link from "next/link";

export default function Unauthorized() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold text-red-600">401 - Unauthorized</h1>
      <p className="text-gray-600 mt-2">
        You do not have permission to view this page.
      </p>
      <Link href="/">
        <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md">
          Go to Home
        </button>
      </Link>
    </div>
  );
}
