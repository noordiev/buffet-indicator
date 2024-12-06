interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="flex justify-center items-center h-[400px] bg-red-50 rounded-xl">
      <p className="text-red-600">{message}</p>
    </div>
  );
}