import React from 'react';

type Props = {
  name: string;
  uiType: 'input'|'date'|'select';
  label: string;
  value: any;
  onChange: (name:string, value:any)=>void;
};

export default function FieldRenderer({name, uiType, label, value, onChange}: Props){
  if(uiType === 'date'){
    return (
      <div className="mb-2">
        <label className="block text-sm">{label}</label>
        <input type="date" value={value||''} onChange={e=>onChange(name,e.target.value)} className="border p-2 w-full" />
      </div>
    );
  }
  // default input
  return (
    <div className="mb-2">
      <label className="block text-sm">{label}</label>
      <input type="text" value={value||''} onChange={e=>onChange(name,e.target.value)} className="border p-2 w-full" />
    </div>
  );
}
