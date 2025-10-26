import { Loading, Navbar, Table } from "@/components";
import type { ModuleProp, TableData } from "@/types";
import { tableConfigs } from "@/config/tableConfigs";
import { useState, useEffect } from "react";
import axios from "axios";

interface PaginatedResponse {
  content: ModuleProp[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

export function ModulesPage() {
  const [page, setPage] = useState(0);
  const [allModules, setAllModules] = useState<ModuleProp[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const size = 200;
  
  const url = (page: number, size: number) => {
    return tableConfigs.modules.pages ? tableConfigs.modules.pages(page, size) : tableConfigs.modules.apiEndpoint;
  }

  // Fetch data for current page
  useEffect(() => {
    const fetchPage = async () => {
      if (page === 0) {
        setIsLoading(true);
      } else {
        setIsLoadingMore(true);
      }
      setError(null);

      try {
        const response = await axios.get<PaginatedResponse>(url(page, size));
        const paginatedData = response.data;

        if (paginatedData && 'content' in paginatedData) {
          const modules = paginatedData.content;
          const currentPage = paginatedData.number;
          const total = paginatedData.totalPages;

          if (currentPage === 0) {
            // First page: replace all data
            setAllModules(modules);
          } else {
            // Subsequent pages: append to existing data
            setAllModules(prev => [...prev, ...modules]);
          }
          setHasMore(currentPage < total - 1);
        }
      } catch (err) {
        console.error('Error fetching modules:', err);
        if (axios.isAxiosError(err)) {
          setError(err.response?.statusText || err.message);
        } else {
          setError('An error occurred while loading modules');
        }
      } finally {
        setIsLoading(false);
        setIsLoadingMore(false);
      }
    };

    fetchPage();
  }, [page, size]);

  const loadMore = () => {
    if (!isLoadingMore && hasMore && !isLoading) {
      setPage(prev => prev + 1);
    }
  };

  const retry = () => {
    setPage(0);
    setAllModules([]);
    setHasMore(true);
  };

  if (error) {
    return (
      <>
        <title>Modules</title>
        <Navbar />
        <div className="spacer" style={{ height: '80px' }}></div>
        <div className="d-flex justify-content-center align-items-center min-vh-100">
          <div className="alert alert-danger d-flex flex-column align-items-center">
            <p>Error loading modules: {error}</p>
            <button 
              className="btn btn-outline-danger btn-sm mt-2" 
              onClick={retry}
            >
              Try Again
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <title>Modules</title>
      <Navbar />
      <div className="spacer" style={{ height: '80px' }}></div>
      <div className="d-flex flex-column align-items-center gap-4">
        <h1>Modules</h1>
        {isLoading && page === 0 ? (
          <Loading />
        ) : allModules.length > 0 ? (
          <Table
            data={allModules as unknown as TableData[]}
            columns={tableConfigs.modules.columns}
            entityName={tableConfigs.modules.entityName}
            idKey={tableConfigs.modules.idKey}
            onLoadMore={loadMore}
            hasMore={hasMore}
            isLoadingMore={isLoadingMore}
          />
        ) : (
          <div className="alert alert-info">
            No modules available at the moment.
          </div>
        )}
      </div>
    </>
  );
}