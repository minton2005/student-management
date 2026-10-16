"use client";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="p-6 text-center">
      <h2 className="text-xl font-bold text-red-600">เกิดข้อผิดพลาดในการโหลดข้อมูล!</h2>
      <p className="text-sm text-gray-500 mt-1">{error.message}</p>
      <button
        onClick={() => reset()}
        className="mt-4 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        ลองใหม่อีกครั้ง
      </button>
    </div>
  );
}