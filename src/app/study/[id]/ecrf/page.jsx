export default async function eCRFDesigner({ params }) {
  const { id } = await params;
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">eCRF Designer</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">eCRF Designer for Study ID: {id}</p>
        <p className="text-gray-500 mt-4">
          This is where you'll design and customize your electronic Case Report
          Forms.
        </p>
      </div>
    </div>
  );
}
