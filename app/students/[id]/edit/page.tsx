import prisma from "../../../lib/prisma";
import { redirect } from "next/navigation";

type EditStudentPageProps = {
  params: Promise<{
    id: string;
  }>;
};

async function updateStudent(
  studentId: number,
  formData: FormData,
) {
  "use server";

  const studentCode = formData.get("studentCode") as string;
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const major = formData.get("major") as string;
  const year = Number(formData.get("year"));

  await prisma.student.update({
    where: {
      id: studentId,
    },

    data: {
      studentCode,
      name,
      email: email || null,
      major,
      year,
    },
  });

  redirect("/students");
}

export default async function EditStudentPage({
  params,
}: EditStudentPageProps) {
  const { id } = await params;

  const studentId = Number(id);

  const student = await prisma.student.findUnique({
    where: {
      id: studentId,
    },
  });

  if (!student) {
    return (
      <main className="mx-auto max-w-2xl p-6">
        <h1 className="text-2xl font-bold text-red-600">
          ไม่พบข้อมูลนักศึกษา
        </h1>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          แก้ไขนักศึกษา
        </h1>

        <p className="mt-2 text-gray-600">
          แก้ไขข้อมูลนักศึกษา ID: {student.id}
        </p>
      </div>

      <form
        action={async (formData) => {
          "use server";

          await updateStudent(studentId, formData);
        }}
        className="space-y-5 rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
      >
        <div>
          <label
            htmlFor="studentCode"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            รหัสนักศึกษา
          </label>

          <input
            id="studentCode"
            type="text"
            name="studentCode"
            defaultValue={student.studentCode}
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>

        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            ชื่อ-นามสกุล
          </label>

          <input
            id="name"
            type="text"
            name="name"
            defaultValue={student.name}
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Email
          </label>

          <input
            id="email"
            type="email"
            name="email"
            defaultValue={student.email ?? ""}
            className="w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>

        <div>
          <label
            htmlFor="major"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            สาขา
          </label>

          <input
            id="major"
            type="text"
            name="major"
            defaultValue={student.major}
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>

        <div>
          <label
            htmlFor="year"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            ชั้นปี
          </label>

          <input
            id="year"
            type="number"
            name="year"
            defaultValue={student.year}
            min="1"
            max="8"
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="rounded-md bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700"
          >
            บันทึกการแก้ไข
          </button>

          <a
            href="/students"
            className="rounded-md border border-gray-300 px-5 py-2 font-medium text-gray-700 hover:bg-gray-50"
          >
            ยกเลิก
          </a>
        </div>
      </form>
    </main>
  );
}