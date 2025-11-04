"use client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Phone, Mail, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AppLoader from "@/components/AppLoader";
import { format } from "date-fns";
import AppError from "@/components/AppError";
import IconWithData from "@/components/IconWithData";
import { getAllCustomers } from "@/api";
import { searchConfig } from "@/config/searchConfig";
import type { Customer } from "@/models/Customer";
import PageHeader from "@/components/PageHeader";


export default function CustomerSearch() {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [filters, setFilters] = useState<Record<string, string>>({});

  useEffect(() => {
    (async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const data = await getAllCustomers();
        setCustomers(data);
        setFilteredCustomers(data);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

function getFieldValue(obj: any, path: string): any {
    console.log(`Path is ${path}`);
    
  const parts = path.split(".");
  let value = obj;

  for (const part of parts) {
    if (Array.isArray(value)) {
      // If it's an array (like addresses), check if *any* element matches
      value = value.map(v => v[part]).filter(v => v !== undefined);
      // If array still nested, flatten one level
      if (value.length === 1) value = value[0];
    } else if (value && typeof value === "object") {
      value = value[part];
    } else {
      return undefined;
    }
  }

  return value;
}

const handleFilter = (key: string, value: string) => {
  const updated = { ...filters, [key]: value.trim().toLowerCase() };
  setFilters(updated);

  let filtered = customers;

    console.log(`filtered data :  ${filtered}`);
  Object.entries(updated).forEach(([k, v]) => {
    if (!v) return;

    const fieldConfig = searchConfig[k];
    if (!fieldConfig) return;

    filtered = filtered.filter((c) => {
      const rawValue = getFieldValue(c, fieldConfig.key);
      if (!rawValue) return false;

      const values = Array.isArray(rawValue) ? rawValue : [rawValue];
      return values.some((val) => {
        const customerValue = String(val).toLowerCase();
        if (fieldConfig.type === "text") {
          return customerValue.includes(v);
        } else {
          return customerValue === v;
        }
      });
    });
  });

  setFilteredCustomers(filtered);
};




  const clearFilter = () => {
    setFilters({});
    setSelectedField(null);
    setFilteredCustomers(customers);
  };

  const sortedFields = Object.entries(searchConfig).sort(
    (a, b) => a[1].renderOrder - b[1].renderOrder
  );

  if (loading) return <AppLoader />;
  if (error) return <AppError />;

  return (
    <div className="p-6">

      <PageHeader title="Customer Search" />

      <div className="mb-3 flex justify-between items-center">
        <span className="text-gray-700 font-medium">Search By:</span>
        <Button variant="link" className="text-red-500" onClick={clearFilter}>
          Clear Filter
        </Button>
      </div>
      <div className="flex gap-2 flex-wrap mb-4">
        {sortedFields.map(([key, field]) => {
          const isSelected = key === selectedField;
          return (
            <button
              key={key}
              className={`px-3 py-1.5 rounded-sm text-sm border ${
                isSelected
                  ? "bg-[#5A2074] text-white border-[#5A2074]"
                  : "bg-white text-gray-600 border-gray-300"
              }`}
              onClick={() =>
                setSelectedField(isSelected ? null : key)
              }
            >
              {field.label}
            </button>
          );
        })}
      </div>

      {selectedField && (
        <div className="mb-6">
          {searchConfig[selectedField].type === "text" ? (
            <Input
              placeholder={searchConfig[selectedField].placeholder}
              value={filters[selectedField] || ""}
              onChange={(e) =>
                handleFilter(selectedField, e.target.value)
              }
            />
          ) : (
            <input
              type="date"
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
              value={filters[selectedField] || ""}
              onChange={(e) => {
                const formatted = format(
                  new Date(e.target.value),
                  "yyyy-MM-dd"
                );
                handleFilter(selectedField, formatted);
              }}
            />
          )}
        </div>
      )}

      {filteredCustomers.length === 0 ? (
        <AppError message="No customers found" />
      ) : (
        <div className="space-y-3">
          {filteredCustomers.map((customer) => (
            <div
              key={customer.id}
              className="bg-gray-50 p-4 rounded-lg cursor-pointer hover:bg-gray-100 transition"
              onClick={() =>
                navigate(`/details/${customer.id}`, {
                  state: {
                    title: `${customer.firstName} ${customer.lastName}`,
                    id: customer.id,
                  },
                })
              }
            >
              <div className="flex justify-between mb-1">
                <h3 className="font-semibold text-gray-800">
                  {customer.firstName} {customer.lastName}
                </h3>
                <span className="text-sm text-gray-600">
                  DOB: {customer.dateOfBirth}
                </span>
              </div>

              {customer.emails && customer.emails.length > 0 && (
                <IconWithData
                  icon={<Mail size={16} />}
                  data={
                    customer.emails.find((e) => e.isPrimary)?.address ||
                    customer.emails[0].address
                  }
                />
              )}

              {customer.phones && customer.phones.length > 0 && (
                <IconWithData
                  icon={<Phone size={16} />}
                  data={
                    customer.phones.find((p) => p.isPrimary)?.number ||
                    customer.phones[0].number
                  }
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
