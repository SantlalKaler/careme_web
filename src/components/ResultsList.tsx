import React from 'react';

type Customer = any;

const displayConfig = [
  { key: 'name', label: 'Name', render: (c:Customer)=> `${c.firstName} ${c.lastName}` },
  { key: 'dob', label: 'DOB', render: (c:Customer)=> c.dateOfBirth },
  { key: 'phone', label: 'Primary Phone', render: (c:Customer)=> (c.phones?.find((p:any)=>p.isPrimary)||{}).number || '—' },
  { key: 'email', label: 'Primary Email', render: (c:Customer)=> (c.emails?.find((e:any)=>e.isPrimary)||{}).address || '—' }
];

export default function ResultsList({customers}:{customers:any[]}){
  if(!customers?.length) return <div className="mt-4">No results</div>;
  return (
    <div className="mt-4">
      <table className="min-w-full border">
        <thead>
          <tr>{displayConfig.map(dc=> <th key={dc.key} className="p-2 border">{dc.label}</th>)}</tr>
        </thead>
        <tbody>
          {customers.map(c=>(
            <tr key={c.id}>
              {displayConfig.map(dc=> <td className="p-2 border" key={dc.key}>{dc.render(c)}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
