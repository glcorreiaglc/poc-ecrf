export default async function InclusionsList({ params }) {
  const { id } = await params;
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Inclusions List</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">Subject inclusions for Study ID: {id}</p>
        <p className="text-gray-500 mt-4">
          This is where you'll manage subjects assigned to this study from the
          global database.
        </p>
      </div>
    </div>
  );
}
