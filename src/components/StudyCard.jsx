import Link from "next/link";
import { Calendar } from "lucide-react";

export default function StudyCard({ study }) {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <Link href={`/study/${study.id}`}>
      <div className="flex flex-col bg-white rounded-lg shadow-md border p-6 hover:shadow-lg transition-shadow cursor-pointer h-[175px]">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {study.name}
        </h3>
        <p className="flex-grow text-gray-600 mb-4 line-clamp-2">{study.description}</p>
        <div className="flex items-center text-sm text-gray-500">
          <Calendar size={16} className="mr-1" />
          Created {formatDate(study.createdAt)}
        </div>
      </div>
    </Link>
  );
}
