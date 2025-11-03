import React, { useState } from 'react';
import FieldRenderer from './FieldRenderer';
import { searchConfig } from '../config/searchConfig';

type Props = { onSearch: (params: Record<string,string>)=>void };

export default function SearchForm({onSearch}: Props){
  const fields = Object.values(searchConfig.fields).sort((a:any,b:any)=>a.renderOrder-b.renderOrder);
  const [form, setForm] = useState<Record<string,string>>({});

  const setField = (name:string, value:any) => setForm(prev => ({...prev, [name]: value}));

  return (
    <form onSubmit={e=>{ e.preventDefault(); onSearch(form); }}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {fields.map((f:any)=>(
          <FieldRenderer key={f.name} name={f.name} uiType={f.uiType} label={f.label} value={form[f.name]} onChange={setField} />
        ))}
      </div>
      <div className="mt-4">
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Search</button>
      </div>
    </form>
  );
}
