"use client";
import { useState, useEffect } from "react";
import { Plus, Mail, Phone, Calendar, User } from "lucide-react";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import Input from "@/components/Input";

export default function SubjectDatabasePage() {
  const [subjects, setSubjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSubject, setNewSubject] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const response = await fetch("/api/subjects");
      const data = await response.json();
      setSubjects(data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSubject = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/subjects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newSubject,
          dateOfBirth: new Date(newSubject.dateOfBirth).toISOString(),
        }),
      });

      if (response.ok) {
        const createdSubject = await response.json();
        setSubjects([...subjects, createdSubject]);
        setNewSubject({
          firstName: "",
          lastName: "",
          dateOfBirth: "",
          gender: "",
          email: "",
          phone: "",
        });
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Error creating subject:", error);
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
    return <div className="max-w-7xl mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Subject Database</h1>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2"
        >
          <Plus size={20} />
          Add Subject
        </Button>
      </div>

      {subjects.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">
            No subjects in database yet
          </p>
          <Button onClick={() => setIsModalOpen(true)}>
            Add Your First Subject
          </Button>
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
                    Added
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {subjects.map((subject) => (
                  <tr key={subject.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <User className="h-5 w-5 text-blue-600" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {subject.firstName} {subject.lastName}
                          </div>
                          <div className="text-sm text-gray-500">
                            ID: {subject.id.slice(-8)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {calculateAge(subject.dateOfBirth)} years old
                      </div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(subject.dateOfBirth)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                        {subject.gender}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {subject.email && (
                        <div className="flex items-center mb-1">
                          <Mail className="h-4 w-4 mr-2 text-gray-400" />
                          <span className="truncate max-w-xs">
                            {subject.email}
                          </span>
                        </div>
                      )}
                      {subject.phone && (
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2 text-gray-400" />
                          {subject.phone}
                        </div>
                      )}
                      {!subject.email && !subject.phone && (
                        <span className="text-gray-400">No contact info</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(subject.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary footer */}
          <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
            <div className="text-sm text-gray-500">
              Total subjects:{" "}
              <span className="font-medium text-gray-900">
                {subjects.length}
              </span>
            </div>
          </div>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Subject"
      >
        <form onSubmit={handleCreateSubject} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="First Name"
              value={newSubject.firstName}
              onChange={(e) =>
                setNewSubject({ ...newSubject, firstName: e.target.value })
              }
              required
            />
            <Input
              label="Last Name"
              value={newSubject.lastName}
              onChange={(e) =>
                setNewSubject({ ...newSubject, lastName: e.target.value })
              }
              required
            />
          </div>
          <Input
            label="Date of Birth"
            type="date"
            value={newSubject.dateOfBirth}
            onChange={(e) =>
              setNewSubject({ ...newSubject, dateOfBirth: e.target.value })
            }
            required
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gender
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newSubject.gender}
              onChange={(e) =>
                setNewSubject({ ...newSubject, gender: e.target.value })
              }
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <Input
            label="Email"
            type="email"
            value={newSubject.email}
            onChange={(e) =>
              setNewSubject({ ...newSubject, email: e.target.value })
            }
          />
          <Input
            label="Phone"
            value={newSubject.phone}
            onChange={(e) =>
              setNewSubject({ ...newSubject, phone: e.target.value })
            }
          />
          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">
              Add Subject
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsModalOpen(false)}
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
