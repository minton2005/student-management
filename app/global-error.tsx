"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-red-600">Global Error</h1>
          <p className="text-gray-600 mt-2">เกิดข้อผิดพลาดร้ายแรงของระบบ</p>
          <button
            onClick={() => reset()}
            className="mt-4 rounded bg-blue-600 px-4 py-2 text-white"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}