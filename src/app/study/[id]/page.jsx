export default async function StudyDashboard({ params }) {
  const { id } = await params;
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Study Dashboard</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">Dashboard content for Study ID: {id}</p>
        <p className="text-gray-500 mt-4">
          This is where you'll see study overview, statistics, and recent
          activity.
        </p>
      </div>
    </div>
  );
}
