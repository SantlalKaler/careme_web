import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PageHeaderProps {
  title: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center mb-5">
      <button
        onClick={() => navigate(-1)}
        className="text-gray-600 hover:text-black mr-3"
      >
        <ArrowLeft size={22} />
      </button>
      <h1 className="text-lg font-semibold text-gray-800">{title}</h1>
    </div>
  );
};

export default PageHeader;
