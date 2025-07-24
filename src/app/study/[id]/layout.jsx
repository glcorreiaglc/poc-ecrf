import StudySidebar from "@/components/StudySidebar";

export default async function StudyLayout({ children, params }) {
  const { id } = await params;
  return (
    <div className="flex">
      <StudySidebar studyId={id} />
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
