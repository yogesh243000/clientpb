import Link from "next/link";

export default function ServerError() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold text-red-600">500 - Server Error</h1>
      <p className="text-gray-600 mt-2">Something went wrong on our end.</p>
      <Link href="/">
        <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md">
          Try Again
        </button>
      </Link>
    </div>
  );
}
