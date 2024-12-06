export function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );
}