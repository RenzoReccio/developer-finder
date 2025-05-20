import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link href="/" className="font-medium text-gray-900">
              Home
            </Link>
            <Link href="/developers" className="font-medium text-gray-600 hover:text-gray-900">
              Find Developers
            </Link>
          </div>
          <div className="flex items-center space-x-2">
            <Link
              href="/resources"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm"
            >
              Resources
            </Link>
            <Link
              href="/signup"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm"
            >
              Sign Up
            </Link>
            <Link
              href="/login"
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}