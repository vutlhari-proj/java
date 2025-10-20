import axios from "axios";
import { Navbar, Table } from "@/components";
import type { ModuleProp } from "@/types";
import { useEffect, useState } from "react";
import type { TableData } from "@/types";

export function ModulesPage() {
  const [modules, setModules] = useState<ModuleProp[]>([]);

  const fetchModules = async () => {
    try {
      const response = await axios.get<ModuleProp[]>("/api/modules");
      console.log("API Response:", response.data);
      console.log("Is array:", Array.isArray(response.data));
      setModules(response.data);
    } catch (error) {
      console.error("Error fetching modules:", error);
      setModules([]); // Set empty array on error
    }
  }

  useEffect(() => {
    fetchModules();
  }, []);

  const moduleColumns = [
    { key: 'code', header: 'Module Code' },
    { key: 'moduleName', header: 'Module Name' }
  ];

  return (
    <>
      <title>Modules</title>
      <Navbar />
      <div className="spacer" style={{ height: '80px' }}></div>
      <div className="d-flex flex-column align-items-center gap-4">
        <h1>Modules</h1>
        <Table 
          data={modules as unknown as TableData[]}
          columns={moduleColumns}
          entityName="module"
          idKey="code"
        />
      </div>
    </>
  );
}