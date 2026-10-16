import { auth, signOut } from "../auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AdminPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if ((session.user as any).role !== "ADMIN") {
    redirect("/unauthorized");
  }

  return (
    <main className="mx-auto max-w-4xl p-8">
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm text-gray-900">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="mt-2 text-gray-600">
          ยินดีต้อนรับคุณ <strong>{session.user.name || session.user.email}</strong> (สิทธิ์: {(session.user as any).role})
        </p>

        <div className="mt-6 flex gap-3">
          <Link
            href="/students"
            className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
          >
            ไปยังหน้าจัดการนักศึกษา
          </Link>

          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/login" });
            }}
          >
            <button
              type="submit"
              className="rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 hover:bg-gray-100"
            >
              ออกจากระบบ
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}