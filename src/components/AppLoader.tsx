import { Loader2 } from "lucide-react";

export default function AppLoader() {
  return (
    <div className="flex items-center justify-center ">
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-lg border border-gray-200">
        <Loader2 className="h-10 w-10 text-[#FF7D27] animate-spin" />
      </div>
    </div>
  );
}
