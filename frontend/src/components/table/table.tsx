import { Table as TableBs } from "react-bootstrap";
import { Role } from "@/services";
import './table.css';
import type { GenericTableProps, TableData } from "@/types/tables";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "@/context/auth/AuthContext";

export function Table({ data, columns, entityName, idKey }: GenericTableProps) {
  console.log("Table received data:", data);
  console.log("data type:", typeof data);
  console.log("is array:", Array.isArray(data));

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  return (
    <div className="table-container d-flex flex-column align-items-center w-100 h-100">
      <TableBs striped bordered hover className="mb-0 custom-table-header" style={{ borderTopLeftRadius: '10px', borderTopRightRadius: '10px', width: '95%' }}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.header}</th>
            ))}
          </tr>
          <tr>
            <td colSpan={columns.length}>
              <div className="d-flex justify-content-center gap-3">
                <div className="img-container width-100">
                  <i className="bi bi-search icon-medium"></i>
                  <span className="tooltip">Search</span>
                </div>
                {user?.role === Role.ADMINISTRATOR && (
                  <div className="img-container width-100">
                    <i className="bi bi-plus-circle-fill icon-medium"></i>
                    <span className="tooltip">Add {entityName}</span>
                  </div>
                )}
              </div>
            </td>
          </tr>
        </thead>
      </TableBs>
      <div className="table-scroll-container">
        <TableBs borderless hover className="mb-0 custom-table-body" style={{ borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px' }}>
          <tbody>
            {data && data.length > 0 ? data.map((item: TableData, index) => (
              <tr 
              key={String(item[idKey])}
              className="table-row"
                onClick={() => navigate(`${entityName}?code=${item[idKey]}`)}>
                {columns.map((column, colIndex) => (
                  <td
                    key={column.key}
                    style={{
                      width: `${100 / columns.length}%`,
                      ...(index === data.length - 1 && colIndex === 0 ? { borderBottomLeftRadius: '10px' } : {}),
                      ...(index === data.length - 1 && colIndex === columns.length - 1 ? { borderBottomRightRadius: '10px' } : {})
                    }}
                  >
                    {String(item[column.key] ?? '')}
                  </td>
                ))}
              </tr>
            )) : (
              <tr>
                <td
                  colSpan={columns.length}
                  style={{ borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px' }}
                >
                  No {entityName}'s available
                </td>
              </tr>
            )}
          </tbody>
        </TableBs>
      </div>
    </div>
  );
}