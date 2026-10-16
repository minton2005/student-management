type SearchFormProps = {
  search?: string;
  major?: string;
  status?: string;
};

export default function SearchForm({
  search = "",
  major = "",
  status = "",
}: SearchFormProps) {
  return (
    <form
      method="GET"
      className="mb-6 rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
    >
      <div className="grid gap-4 md:grid-cols-4">
        {/* ค้นหา */}
        <div className="md:col-span-2">
          <label
            htmlFor="search"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            ค้นหา
          </label>
          <input
            id="search"
            name="search"
            type="text"
            defaultValue={search}
            placeholder="ค้นหารหัส หรือชื่อ..."
            className="w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>

        {/* สาขา */}
        <div>
          <label
            htmlFor="major"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            สาขา
          </label>
          <select
            id="major"
            name="major"
            defaultValue={major}
            className="w-full rounded-md border border-gray-300 px-3 py-2"
          >
            <option value="">ทุกสาขา</option>
            <option value="Information Technology">Information Technology</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Digital Technology">Digital Technology</option>
          </select>
        </div>

        {/* สถานะ */}
        <div>
          <label
            htmlFor="status"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            สถานะ
          </label>
          <select
            id="status"
            name="status"
            defaultValue={status}
            className="w-full rounded-md border border-gray-300 px-3 py-2"
          >
            <option value="">ทั้งหมด</option>
            <option value="active">กำลังศึกษา</option>
            <option value="inactive">พ้นสภาพ</option>
          </select>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          type="submit"
          className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
        >
          ค้นหา
        </button>
        <a
          href="/students"
          className="rounded-md border border-gray-300 px-4 py-2 font-medium text-gray-700 hover:bg-gray-50"
        >
          ล้าง
        </a>
      </div>
    </form>
  );
}