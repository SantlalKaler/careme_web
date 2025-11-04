
import Home from './pages/Home';
import React from "react";
import { Routes, Route } from "react-router-dom";
import CustomerSearch from './pages/CustomerSearch';
import CustomerDetails from './pages/CustomerDetails';

function App(){
//   const [customers, setCustomers] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string|undefined>();

//   const onSearch = async (params: Record<string,string>) => {
//   const data = await searchCustomers({});
//   const lowerParams = Object.fromEntries(
//     Object.entries(params).map(([k,v])=>[k,v.toLowerCase()])
//   );

//   const filtered = data.filter((cust:any)=>{
//     return Object.entries(lowerParams).every(([k,v])=>{
//       return cust[k]?.toLowerCase().includes(v);
//     });
//   });
//   setCustomers(filtered);
// };


  // return (
  //   <div className="p-6 max-w-4xl mx-auto">
  //     <Home/>
  //     {/* <h1 className="text-2xl font-bold mb-4">Customer Search</h1>
  //     <SearchForm onSearch={onSearch} />
  //     {loading && <div className="mt-4">Loading...</div>}
  //     {error && <div className="mt-4 text-red-600">{error}</div>}
  //     <ResultsList customers={customers} /> */}
  //   </div>
  // );
  return (
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/customers/search" element={<CustomerSearch />} />
      <Route path="/details/:id" element={<CustomerDetails />} />
    </Routes>
  );
}

export default App;
