import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold text-red-600">404 - Page Not Found</h1>
      <p className="text-gray-600 mt-2">
        The page you're looking for doesn't exist.
      </p>
      <Link href="/">
        <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md">
          Back to Home
        </button>
      </Link>
    </div>
  );
}
