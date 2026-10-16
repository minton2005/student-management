import prisma from "../lib/prisma";
import DeleteButton from "./delete-button";
import SearchForm from "./search-form";
import Link from "next/link";
import { auth, signOut } from "../auth";

type StudentsPageProps = {
  searchParams: Promise<{
    search?: string;
    major?: string;
    status?: string;
  }>;
};

export default async function StudentsPage({
  searchParams,
}: StudentsPageProps) {
  const session = await auth();
  const params = await searchParams;

  const search = params.search ?? "";
  const major = params.major ?? "";
  const status = params.status ?? "";

  const students = await prisma.student.findMany({
    where: {
      AND: [
        search
          ? {
              OR: [
                { studentCode: { contains: search } },
                { name: { contains: search } },
              ],
            }
          : {},
        major ? { major: major } : {},
        status ? { status: status === "active" } : {},
      ],
    },
    orderBy: {
      id: "asc",
    },
  });

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Navbar ด้านบนสำหรับกดไปหน้าอื่น */}
      <nav className="border-b border-gray-200 bg-white px-6 py-4 shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="text-xl font-bold text-blue-600">StudentApp</span>
            <Link href="/admin" className="text-sm font-medium text-gray-600 hover:text-blue-600">
              Admin Dashboard
            </Link>
            <Link href="/students" className="text-sm font-bold text-blue-600">
              จัดการนักศึกษา
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {session?.user && (
              <span className="text-sm text-gray-600">
                {session.user.name || session.user.email}
              </span>
            )}
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/login" });
              }}
            >
              <button
                type="submit"
                className="rounded border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-100"
              >
                ออกจากระบบ
              </button>
            </form>
          </div>
        </div>
      </nav>

      {/* เนื้อหาหลัก */}
      <main className="mx-auto max-w-6xl p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Student Management</h1>
          <p className="mt-2 text-gray-600">จัดการข้อมูลนักศึกษา</p>
        </div>

        {/* ฟอร์มค้นหา */}
        <SearchForm search={search} major={major} status={status} />

        <div className="mb-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            พบข้อมูล <strong>{students.length}</strong> รายการ
          </div>
          <a
            href="/students/create"
            className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            เพิ่มนักศึกษา
          </a>
        </div>

        {/* ตารางแสดงข้อมูล */}
        <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 font-semibold">ID</th>
                <th className="px-4 py-3 font-semibold">รหัสนักศึกษา</th>
                <th className="px-4 py-3 font-semibold">ชื่อ</th>
                <th className="px-4 py-3 font-semibold">Email</th>
                <th className="px-4 py-3 font-semibold">สาขา</th>
                <th className="px-4 py-3 font-semibold">ชั้นปี</th>
                <th className="px-4 py-3 font-semibold">สถานะ</th>
                <th className="px-4 py-3 font-semibold">จัดการ</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{student.id}</td>
                  <td className="px-4 py-3">{student.studentCode}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">{student.name}</td>
                  <td className="px-4 py-3">{student.email ?? "-"}</td>
                  <td className="px-4 py-3">{student.major}</td>
                  <td className="px-4 py-3">{student.year}</td>
                  <td className="px-4 py-3">
                    {student.status ? (
                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                        กำลังศึกษา
                      </span>
                    ) : (
                      <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                        พ้นสภาพ
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <a
                        href={`/students/${student.id}/edit`}
                        className="rounded-md bg-yellow-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-yellow-600"
                      >
                        แก้ไข
                      </a>
                      <DeleteButton id={student.id} />
                    </div>
                  </td>
                </tr>
              ))}

              {students.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                    ไม่พบข้อมูลนักศึกษา
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}