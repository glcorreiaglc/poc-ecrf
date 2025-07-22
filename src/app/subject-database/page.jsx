"use client";
import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import SubjectCard from "@/components/SubjectCard";
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

  if (loading) {
    return <div className="max-w-6xl mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject) => (
            <SubjectCard key={subject.id} subject={subject} />
          ))}
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
