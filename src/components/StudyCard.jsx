import Link from "next/link";
import { Calendar, FileText } from "lucide-react";

export default function StudyCard({ study }) {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <Link href={`/study/${study.id}`}>
      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {study.name}
        </h3>
        {study.description && (
          <p className="text-gray-600 mb-4 line-clamp-2">{study.description}</p>
        )}
        <div className="flex items-center text-sm text-gray-500">
          <Calendar size={16} className="mr-1" />
          Created {formatDate(study.createdAt)}
        </div>
      </div>
    </Link>
  );
}
