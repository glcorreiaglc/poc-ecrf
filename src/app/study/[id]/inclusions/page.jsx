"use client";
import { useState, useEffect } from "react";
import { UserPlus, Mail, Phone, Calendar, User, X } from "lucide-react";
import Modal from "@/components/Modal";
import Button from "@/components/Button";

export default function InclusionsList({ params }) {
  const [includedSubjects, setIncludedSubjects] = useState([]);
  const [availableSubjects, setAvailableSubjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [loading, setLoading] = useState(true);
  const [study, setStudy] = useState(null);

  useEffect(() => {
    fetchData();
  }, [params.id]);

  const fetchData = async () => {
    try {
      // Fetch study details
      const studyResponse = await fetch(`/api/studies/${params.id}`);
      const studyData = await studyResponse.json();
      setStudy(studyData);

      // Fetch inclusions for this study
      const inclusionsResponse = await fetch(
        `/api/studies/${params.id}/inclusions`
      );
      const inclusionsData = await inclusionsResponse.json();
      setIncludedSubjects(inclusionsData);

      // Fetch all subjects to determine available ones
      const subjectsResponse = await fetch("/api/subjects");
      const allSubjects = await subjectsResponse.json();

      // Filter out subjects already included in this study
      const includedSubjectIds = inclusionsData.map(
        (inclusion) => inclusion.subject.id
      );
      const available = allSubjects.filter(
        (subject) => !includedSubjectIds.includes(subject.id)
      );
      setAvailableSubjects(available);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAssignSubject = async (e) => {
    e.preventDefault();
    if (!selectedSubject) return;

    try {
      const response = await fetch(`/api/studies/${params.id}/inclusions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subjectId: selectedSubject }),
      });

      if (response.ok) {
        const newInclusion = await response.json();
        setIncludedSubjects([...includedSubjects, newInclusion]);

        // Remove the assigned subject from available subjects
        setAvailableSubjects(
          availableSubjects.filter((subject) => subject.id !== selectedSubject)
        );

        setSelectedSubject("");
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Error assigning subject:", error);
    }
  };

  const handleRemoveSubject = async (inclusionId, subjectData) => {
    try {
      const response = await fetch(
        `/api/studies/${params.id}/inclusions/${inclusionId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setIncludedSubjects(
          includedSubjects.filter((inclusion) => inclusion.id !== inclusionId)
        );
        setAvailableSubjects([...availableSubjects, subjectData]);
      }
    } catch (error) {
      console.error("Error removing subject:", error);
    }
  };

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

  if (loading) {
    return <div className="py-8">Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Inclusions List</h1>
          {study && (
            <p className="text-gray-600 mt-2">
              Subjects assigned to:{" "}
              <span className="font-medium">{study.name}</span>
            </p>
          )}
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2"
          disabled={availableSubjects.length === 0}
        >
          <UserPlus size={20} />
          Assign Subject
        </Button>
      </div>

      {includedSubjects.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <div className="max-w-md mx-auto">
            <UserPlus className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No subjects assigned
            </h3>
            <p className="text-gray-500 mb-6">
              Start building your study by assigning subjects from the global
              database.
            </p>
            {availableSubjects.length > 0 ? (
              <Button onClick={() => setIsModalOpen(true)}>
                Assign First Subject
              </Button>
            ) : (
              <p className="text-sm text-gray-400">
                No subjects available. Add subjects to the global database
                first.
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Age / DOB
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Gender
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Assigned
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {includedSubjects.map((inclusion) => (
                  <tr key={inclusion.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <User className="h-5 w-5 text-blue-600" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {inclusion.subject.firstName}{" "}
                            {inclusion.subject.lastName}
                          </div>
                          <div className="text-sm text-gray-500">
                            ID: {inclusion.subject.id.slice(-8)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {calculateAge(inclusion.subject.dateOfBirth)} years old
                      </div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(inclusion.subject.dateOfBirth)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                        {inclusion.subject.gender}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {inclusion.subject.email && (
                        <div className="flex items-center mb-1">
                          <Mail className="h-4 w-4 mr-2 text-gray-400" />
                          <span className="truncate max-w-xs">
                            {inclusion.subject.email}
                          </span>
                        </div>
                      )}
                      {inclusion.subject.phone && (
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2 text-gray-400" />
                          {inclusion.subject.phone}
                        </div>
                      )}
                      {!inclusion.subject.email && !inclusion.subject.phone && (
                        <span className="text-gray-400">No contact info</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(inclusion.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() =>
                          handleRemoveSubject(inclusion.id, inclusion.subject)
                        }
                        className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors"
                        title="Remove from study"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary footer */}
          <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
            <div className="text-sm text-gray-500">
              Assigned subjects:{" "}
              <span className="font-medium text-gray-900">
                {includedSubjects.length}
              </span>
              {availableSubjects.length > 0 && (
                <span className="ml-4">
                  Available to assign:{" "}
                  <span className="font-medium text-gray-900">
                    {availableSubjects.length}
                  </span>
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Assign Subject to Study"
      >
        <form onSubmit={handleAssignSubject} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Subject to Assign
            </label>
            {availableSubjects.length === 0 ? (
              <p className="text-gray-500 text-sm py-4">
                All subjects from the database are already assigned to this
                study.
              </p>
            ) : (
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                required
              >
                <option value="">Choose a subject...</option>
                {availableSubjects.map((subject) => (
                  <option key={subject.id} value={subject.id}>
                    {subject.firstName} {subject.lastName} -{" "}
                    {calculateAge(subject.dateOfBirth)} years old (
                    {subject.gender})
                  </option>
                ))}
              </select>
            )}
          </div>

          {selectedSubject && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">
                Selected Subject Details:
              </h4>
              {(() => {
                const subject = availableSubjects.find(
                  (s) => s.id === selectedSubject
                );
                return subject ? (
                  <div className="text-sm text-blue-700 space-y-1">
                    <p>
                      <strong>Name:</strong> {subject.firstName}{" "}
                      {subject.lastName}
                    </p>
                    <p>
                      <strong>Age:</strong> {calculateAge(subject.dateOfBirth)}{" "}
                      years old
                    </p>
                    <p>
                      <strong>Gender:</strong> {subject.gender}
                    </p>
                    <p>
                      <strong>DOB:</strong> {formatDate(subject.dateOfBirth)}
                    </p>
                    {subject.email && (
                      <p>
                        <strong>Email:</strong> {subject.email}
                      </p>
                    )}
                    {subject.phone && (
                      <p>
                        <strong>Phone:</strong> {subject.phone}
                      </p>
                    )}
                  </div>
                ) : null;
              })()}
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              className="flex-1"
              disabled={!selectedSubject}
            >
              Assign Subject
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setIsModalOpen(false);
                setSelectedSubject("");
              }}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
