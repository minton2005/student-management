import Link from "next/link";

export default function NotFound() {
  return (
    <div className="p-8 text-center">
      <h2 className="text-2xl font-bold text-red-600">404 - ไม่พบบทความนี้ในระบบ</h2>
      <p className="text-gray-600 mt-2">
        รหัสบทความที่คุณค้นหาไม่มีอยู่จริง หรืออาจถูกลบออกไปแล้ว
      </p>
      <div className="mt-5">
        <Link
          href="/blogs"
          className="text-blue-600 underline hover:text-blue-800"
        >
          ← ย้อนกลับไปยังหน้ารายการบทความทั้งหมด
        </Link>
      </div>
    </div>
  );
}