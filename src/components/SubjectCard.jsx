import { User, Calendar, Mail, Phone } from "lucide-react";

export default function SubjectCard({ subject }) {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }
    return age;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <User size={24} className="text-blue-600 mr-3" />
        <h3 className="text-xl font-semibold text-gray-900">
          {subject.firstName} {subject.lastName}
        </h3>
      </div>

      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex items-center">
          <Calendar size={16} className="mr-2" />
          Age: {calculateAge(subject.dateOfBirth)} (
          {formatDate(subject.dateOfBirth)})
        </div>
        <div className="flex items-center">
          <span className="w-4 h-4 mr-2 text-center">⚥</span>
          {subject.gender}
        </div>
        {subject.email && (
          <div className="flex items-center">
            <Mail size={16} className="mr-2" />
            {subject.email}
          </div>
        )}
        {subject.phone && (
          <div className="flex items-center">
            <Phone size={16} className="mr-2" />
            {subject.phone}
          </div>
        )}
      </div>
    </div>
  );
}
