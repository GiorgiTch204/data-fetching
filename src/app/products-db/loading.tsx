export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 bg-gray-900">
      <div className="h-16 w-16 border-4 border-gray-700 border-t-gray-100 rounded-full animate-spin" />
      <p className="text-gray-200 text-xl font-medium">Loading products...</p>
    </div>
  );
}
