# Care4Me Web - Technical Assignment

This is a **React + TypeScript + TailwindCSS** based customer search application built for the **Care4Me technical assignment**.  
It demonstrates a **configuration-driven UI**, **mock API (JSON Server)**, and **dynamic search** supporting **nested object filtering**.

---

## Tech Stack
- **React + TypeScript (Vite)** — Frontend framework and tooling
- **TailwindCSS** — Utility-first CSS for styling
- **Axios** — API communication layer
- **JSON Server** — Mock REST API for customer data
- **Config-driven rendering** — All form fields and display columns defined via configuration

---


---

##  Setup Instructions

### 1. Clone and Install Dependencies
```bash
git clone https://github.com/santlalkaler/care4me_web.git
cd care4me_web
npm install

Setup Mock API (JSON Server)
```

### 2. Setup Mock API (JSON Server)

Run the mock API:
npm run json-server

Run the Frontend
npm run dev


### How It Works
1. Configuration-driven UI

All form fields are defined in a single config file (searchConfig.ts):

``ts
export const searchConfig = {
  fields: {
    firstName: { uiType: 'input', label: 'First Name', renderOrder: 1, name: 'firstName' },
    lastName:  { uiType: 'input', label: 'Last Name', renderOrder: 2, name: 'lastName' },
    dateOfBirth: { uiType: 'date', label: 'Date of Birth', renderOrder: 3, name: 'dateOfBirth' },
  }
};


Adding or removing fields requires no code change — only update this config.

2. Dynamic Form Rendering

SearchForm.tsx iterates over the config and renders input fields using a generic component FieldRenderer.tsx.

{fields.map(f => (
  <FieldRenderer
    key={f.name}
    name={f.name}
    uiType={f.uiType}
    label={f.label}
    value={form[f.name]}
    onChange={setField}
  />
))}

The FieldRenderer component decides which input type to render (text, date, select, etc.)
based on uiType.

3. API Call + Case-insensitive Search

api.ts automatically converts all search parameters into _like queries (for regex-based case-insensitive match).

Object.entries(params).forEach(([key, value]) => {
  if (value?.trim()) query[`${key}_like`] = value.trim();
});
const res = await api.get('/customers', { params: query });

So firstName=jo will match “John”, “JOHN”, “joHN”, etc.

4. Result Display
ResultsList.tsx uses a small config array defining what columns to show:
const displayConfig = [
  { key: 'name', label: 'Name', render: (c) => `${c.firstName} ${c.lastName}` },
  { key: 'dob', label: 'DOB', render: (c) => c.dateOfBirth },
  { key: 'city', label: 'City', render: (c) => c.addresses?.[0]?.city || '—' }
];


Example Flow

User enters firstName = john

Form sends { firstName_like: "john" } to API

API returns all “John” records

Results displayed dynamically

Key Features

Configurable UI (add fields without touching React code)
 Case-insensitive and partial match search
 Nested object filtering (addresses, phones, etc.)
 TypeScript for type safety
 TailwindCSS for clean, fast styling
 Works fully offline with JSON Server mock API





