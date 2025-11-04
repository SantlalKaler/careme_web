
import { AlertCircle } from "lucide-react";

interface AppErrorProps {
  message?: string;
}

export default function AppError({ message }: AppErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-6">
      <AlertCircle size={50} className="text-[#FF7D27] mb-3" />
      <p className="text-gray-600 text-sm">
        {message || "Customer data not found"}
      </p>
    </div>
  );
}
