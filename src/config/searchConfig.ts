import type { FieldConfig } from "@/models/FieldConfig";

export const searchConfig: Record<string, FieldConfig> = {
  firstName: {
    key: "firstName",
    type: "text",
    label: 'First Name',
    placeholder: 'Enter first name',
    renderOrder: 1,
  },
  lastName: {
    key: "lastName",
    type: "text",
    label: 'Last Name',
    placeholder: 'Enter last name',
    renderOrder: 2,
  },
  dateOfBirth: {
    key: "dateOfBirth",
    label: "Date of Birth",
    type: "date",
    placeholder: "Select date",
    renderOrder: 3,
  },
  // maritalStatus: {
  //   key: "maritalStatus",
  //   label: "Marital Status",
  //   type: "text",
  //   placeholder: "Enter marital status",
  //   renderOrder: 4,
  // },
  // addressescity: {
  //   key: "addresses.city",
  //   label: "City",
  //   type: "text",
  //   placeholder: "Enter City",
  //   renderOrder: 5,
  // },
  // number: {
  //   key: "phones.number",
  //   label: "Phone Number",
  //   type: "text",
  //   placeholder: "Enter Phone Number",
  //   renderOrder: 6,
  // },
}