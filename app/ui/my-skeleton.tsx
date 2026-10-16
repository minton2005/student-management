// 1. Skeleton สำหรับการ์ดบทความ 1 ใบ
export function BlogCardSkeleton() {
  return (
    <div className="p-4 border border-gray-200 rounded-lg shadow animate-pulse">
      <div className="h-40 bg-gray-200 rounded-md mb-4"></div>
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>
    </div>
  );
}

// 2. Skeleton สำหรับรายการบทความแบบ Grid
export function BlogListSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <BlogCardSkeleton />
      <BlogCardSkeleton />
      <BlogCardSkeleton />
      <BlogCardSkeleton />
      <BlogCardSkeleton />
      <BlogCardSkeleton />
    </div>
  );
}