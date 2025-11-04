
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";
import logo from "@/assets/logo.png";
import { useEffect, useState } from "react";
import type { Customer } from "@/models/Customer";
import { getAllCustomers } from "@/api";
import { useNavigate } from "react-router-dom";
import AppLoader from "@/components/AppLoader";



export default function Home() {
   const [customers, setCustomers] = useState<Customer[]>([]);

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

    useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const data = await getAllCustomers();
        setCustomers(data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

 const maritalCounts = (customers ?? []).reduce(
  (acc, curr) => {
    acc.total++;

    switch (curr.maritalStatus) {
      case "Married":
        acc.married++;
        break;
      case "Divorced":
        acc.divorced++;
        break;
      case "Single":
        acc.single++;
        break;
      case "Widowed":
        acc.widowed++;
        break;
    }

    return acc;
  },
  { total: 0, married: 0, divorced: 0, single: 0, widowed: 0 }
);


    const updatedStats = [
    { label: "Total Customers", value: maritalCounts.total },
    { label: "Married", value: maritalCounts.married },
    { label: "Divorced", value: maritalCounts.divorced },
    { label: "Single", value: maritalCounts.single },
    { label: "Widowed", value: maritalCounts.widowed },
  ];

  const handleFocus = () => {
  navigate("/customers/search");
};

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
     
      <div className="bg-[#FF7D27]/10 rounded-3xl p-8 w-full max-w-sm flex flex-col items-center shadow-sm">
       <img src={logo} alt="Care4Me Logo" className="w-52 h-50 rounded-xl" />
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Care4Me</h1>

       {loading ? (
          <div className="h-48 flex items-center justify-center bg-transparent">
            <AppLoader/>
          </div>
        ) : <div className="w-full space-y-3">
  <Card className="bg-[#5A2074] text-white rounded-xl">
    <CardContent className="text-center py-4">
      <p className="text-sm font-medium">{updatedStats[0].label}</p>
      <p className="text-2xl font-semibold mt-1">{updatedStats[0].value}</p>
    </CardContent>
  </Card>

  <div className="grid grid-cols-2 gap-3">
    {updatedStats.slice(1).map((item, index) => (
      <Card key={index} className="bg-[#5A2074] text-white rounded-xl">
        <CardContent className="text-center py-4">
          <p className="text-sm font-medium">{item.label}</p>
          <p className="text-2xl font-semibold mt-1">{item.value}</p>
        </CardContent>
      </Card>
    ))}
  </div>
</div>}
        <div className="w-full mt-6">
          <div className="relative">
            <Input
              placeholder="Search for a customer..."
                 onFocus={handleFocus}
                 readOnly 
              className="px-4 py-6 rounded-xl border-gray-300 text-gray-700 bg-white  cursor-pointer"
            />
            <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-500" />
          </div>
        </div>
      </div>
    </div>
  );
}
