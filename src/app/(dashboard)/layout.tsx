import { Navbar } from "@/components/navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="flex-1 container mx-auto max-w-5xl px-4 py-10">
        {children}
      </main>
    </>
  );
}
