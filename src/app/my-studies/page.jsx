"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import StudyCard from "@/components/StudyCard";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import Input from "@/components/Input";

export default function MyStudiesPage() {
  const [studies, setStudies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newStudy, setNewStudy] = useState({ name: "", description: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudies();
  }, []);

  const fetchStudies = async () => {
    try {
      const response = await fetch("/api/studies");
      const data = await response.json();
      setStudies(data);
    } catch (error) {
      console.error("Error fetching studies:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateStudy = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/studies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newStudy),
      });

      if (response.ok) {
        const createdStudy = await response.json();
        setStudies([...studies, createdStudy]);
        setNewStudy({ name: "", description: "" });
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Error creating study:", error);
    }
  };

  if (loading) {
    return <div className="max-w-6xl mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Studies</h1>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2"
        >
          <Plus size={20} />
          New Study
        </Button>
      </div>

      {studies.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">No studies created yet</p>
          <Button onClick={() => setIsModalOpen(true)}>
            Create Your First Study
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {studies.map((study) => (
            <StudyCard key={study.id} study={study} />
          ))}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Study"
      >
        <form onSubmit={handleCreateStudy} className="space-y-4">
          <Input
            label="Study Name"
            value={newStudy.name}
            onChange={(e) => setNewStudy({ ...newStudy, name: e.target.value })}
            required
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              value={newStudy.description}
              onChange={(e) =>
                setNewStudy({ ...newStudy, description: e.target.value })
              }
            />
          </div>
          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">
              Create Study
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
