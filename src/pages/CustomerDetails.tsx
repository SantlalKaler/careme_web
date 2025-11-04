"use client";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Mail, Phone, MapPin, Calendar, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import AppLoader from "@/components/AppLoader";
import AppError from "@/components/AppError";
import { getCustomerById } from "@/api"; 
import profileImage from "@/assets/profile.png"; 
import type { Customer } from "@/models/Customer";
import PageHeader from "@/components/PageHeader";


export default function CustomerDetails() {
  const { id } = useParams();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const data = await getCustomerById(id);
        setCustomer(data);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <AppLoader />;
  if (error || !customer) return <AppError />;

  return (
    <div className="p-6">
      <PageHeader title={`${customer.firstName} ${customer.lastName}`} />

      <div
        className="rounded-xl p-4 flex items-center gap-4 mb-8 bg-[#5A2074]"
      >
        <img
          src={profileImage}
          alt="Profile"
          className="w-14 h-14 rounded-full object-cover bg-white p-1"
        />
        <div>
          <h2 className="text-white text-lg font-semibold">
            {customer.firstName} {customer.lastName}
          </h2>
          <p className="text-white text-sm opacity-90">
            {customer.maritalStatus}
          </p>
        </div>
      </div>

      <div className="space-y-3 mb-8">
        <InfoRow
          icon={<Calendar className="text-gray-600" size={18} />}
          title="DOB"
          value={customer.dateOfBirth}
        />
        <InfoRow
          icon={<Users className="text-gray-600" size={18} />}
          title="Marital Status"
          value={customer.maritalStatus || "-"}
        />
      </div>

      <InfoSection
        icon={<MapPin className="text-[#5A2074]" size={18} />}
        title="Addresses"
      >
        {customer.addresses?.map((address) => (
          <InfoRow
            key={address.id}
            title={address.type}
            value={`${address.street}, ${address.city}, ${address.state}, ${address.zipCode}`}
          />
        ))}
      </InfoSection>

      <div className="mt-8 space-y-8">
        <InfoSection
          icon={<Phone className="text-[#5A2074]" size={18} />}
          title="Phones"
        >
          {customer.phones?.map((phone) => (
            <InfoRow
              key={phone.id}
              title={`${phone.type}${phone.isPrimary ? " (Primary)" : ""}`}
              value={phone.number}
            />
          ))}
        </InfoSection>

        <InfoSection
          icon={<Mail className="text-[#5A2074]" size={18} />}
          title="Emails"
        >
          {customer.emails?.map((email) => (
            <InfoRow
              key={email.id}
              title={`${email.type}${email.isPrimary ? " (Primary)" : ""}`}
              value={email.address}
            />
          ))}
        </InfoSection>
      </div>
    </div>
  );
}


function InfoRow({
  icon,
  title,
  value,
}: {
  icon?: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="flex justify-between items-start py-1">
      <div className="flex items-start gap-2 text-gray-700">
        {icon}
        <span className="font-medium">{title}</span>
      </div>
      <span className="text-gray-600 text-sm text-right">{value}</span>
    </div>
  );
}

function InfoSection({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="bg-gray-50 border-none shadow-sm rounded-xl">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-2">
          {icon}
          <h3 className="font-semibold text-gray-800">{title}</h3>
        </div>
        <hr className="border-gray-200 mb-3" />
        <div className="space-y-2">{children}</div>
      </CardContent>
    </Card>
  );
}
