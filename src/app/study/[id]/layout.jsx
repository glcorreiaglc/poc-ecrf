import StudySidebar from "@/components/StudySidebar";

export default function StudyLayout({ children, params }) {
  return (
    <div className="flex">
      <StudySidebar studyId={params.id} />
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
