import { BlogListSkeleton } from "../ui/my-skeleton";

export default function LoadingPage() {
  return (
    <main className="p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-700">กำลังโหลดรายการบทความ...</h2>
      <BlogListSkeleton />
    </main>
  );
}