import { Table as TableBs } from "react-bootstrap";
import { Role } from "@/services";
import './table.css';
import type { GenericTableProps, TableData } from "@/types/tables";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/auth/AuthContext";
import { usePostData } from "@/hooks";
import type { ModuleSearchRequest, CourseProp, ModuleProp } from "@/types";
import { Loading } from "../loading/Loading";

export function Table({ data, columns, entityName, idKey }: GenericTableProps) {
  console.log("Table received data:", data);
  console.log("data type:", typeof data);
  console.log("is array:", Array.isArray(data));

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [displaySearchInput, setDisplaySearchInput] = useState(false);
  const [query, setQuery] = useState("");
  const [searchedItems, setSearchedItems] = useState<(ModuleProp | CourseProp)[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const { mutateData: search, isLoading } = usePostData<ModuleSearchRequest, { results: ModuleProp[] | CourseProp[] }>({
    apiEndpoint: "/api/search",
    onSuccess: (data) => {
      const items = data?.results || [];
      setSearchedItems(Array.isArray(items) ? items : []);
      setIsSearching(false);
      console.log("Search results:", items);
    },
    onError: (error) => {
      console.error('Search failed:', error);
      setSearchedItems([]);
    }
  });

  useEffect(() => {
    const q = query.trim();
    if (q.length < 2) {
      setSearchedItems([]);
      setIsSearching(false);
      return;
    }
    const controller = setTimeout(() => {
      search({ query: q, type: entityName });
      console.log(searchedItems);
    }, 500); // debounce
    setIsSearching(true);
    return () => clearTimeout(controller);
  }, [query, entityName]);//eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && displaySearchInput) setDisplaySearchInput(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [displaySearchInput]);

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

                <div className="search_box d-flex align-items-center">
                  {displaySearchInput && (
                    <div className="input_box">
                      <input
                        className="input_field px-2 py-1 rounded-2"
                        onChange={(e) => { setQuery(e.target.value) }} />

                      <div>
                        <i className="bi bi-search icon-medium"></i>
                      </div>
                    </div>
                  )}

                  {!displaySearchInput && (
                    <div
                      className="img-container width-100"
                      onClick={() => { setDisplaySearchInput(!displaySearchInput) }}>
                      <i className="bi bi-search icon-medium"></i>
                      <span className="tooltip">Search</span>
                    </div>
                  )}
                </div>


                {user?.role === Role.ADMINISTRATOR && !displaySearchInput && (
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
            {
              (isLoading) ? (
                <tr>
                  <td colSpan={columns.length} style={{ borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px' }}>
                    <Loading />
                  </td>
                </tr>
              ) : // Prefer showing server search results when available and user has typed a query
                (query.trim().length >= 2 && searchedItems && searchedItems.length > 0)
                  ? // show searchedItems
                  (searchedItems as unknown as TableData[]).map((item, index) => (
                    <tr
                      key={String(item[idKey] ?? item.code ?? index)}
                      className="table-row"
                      onClick={() => navigate(`${entityName}?code=${item[idKey] ?? item.code}`)}>
                      {columns.map((column, colIndex) => (
                        <td
                          key={column.key}
                          style={{
                            width: `${100 / columns.length}%`,
                            ...(index === searchedItems.length - 1 && colIndex === 0 ? { borderBottomLeftRadius: '10px' } : {}),
                            ...(index === searchedItems.length - 1 && colIndex === columns.length - 1 ? { borderBottomRightRadius: '10px' } : {})
                          }}
                        >
                          {String((item as Record<string, unknown>)[column.key as string] ?? '')}
                        </td>
                      ))}
                    </tr>
                  ))
                  :
                  (query.trim().length >= 2 && searchedItems && searchedItems.length === 0) && !isSearching
                    ? (
                      <tr>
                        <td colSpan={columns.length}>
                          No results found for "{query}"
                        </td>
                      </tr>
                    )
                    : (data && data.length > 0 ? data.map((item: TableData, index) => (
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
                  ))
            }
          </tbody>
        </TableBs>
      </div>
    </div>
  );
}