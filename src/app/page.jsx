export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Welcome to eCRF Portal
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Your comprehensive platform for managing electronic Case Report Forms
          and clinical trial data
        </p>
        <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Getting Started
          </h2>
          <p className="text-gray-600 mb-6">
            Use the navigation above to manage your studies and subject
            database. Create new studies, design eCRFs, and track subject
            inclusions all in one place.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">My Studies</h3>
              <p className="text-blue-600 text-sm">
                Manage your clinical studies and design custom eCRFs
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">
                Subject Database
              </h3>
              <p className="text-green-600 text-sm">
                Centralized database of all study subjects
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
