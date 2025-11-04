import type { ReactNode } from "react";

interface IconWithDataProps {
  icon: ReactNode;
  data: string;
  color?: string;
}

export default function IconWithData({ icon, data, color }: IconWithDataProps) {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-700">
      <div className={`text-[${color || "#5A2074"}]`}>{icon}</div>
      <span className="truncate">{data}</span>
    </div>
  );
}
