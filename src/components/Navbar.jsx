import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold hover:text-blue-200">
            eCRF Portal
          </Link>
          <div className="flex space-x-6">
            <Link
              href="/my-studies"
              className="hover:text-blue-200 transition-colors"
            >
              My Studies
            </Link>
            <Link
              href="/subject-database"
              className="hover:text-blue-200 transition-colors"
            >
              Subject Database
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
