import { useEffect, useState } from "react";
import axios from "axios";
import { Loading, Navbar, Table } from "@/components";
import { MobileTable } from "@/components/table/mobileTable";
import type { TableData } from "@/types";

export interface ColumnDef { key: string; header: string }

interface Props {
  title: string;
  size?: number;
  apiEndpoint?: string;
  pages?: (page: number, size: number) => string;
  columns: ColumnDef[];
  entityName: string;
  idKey: string;
}

interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

export function PaginatedTablePage(props: Props) {
  const { title, size = 200, apiEndpoint, pages, columns, entityName, idKey } = props;

  const [page, setPage] = useState(0);
  const [items, setItems] = useState<Record<string, unknown>[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(max-width: 576px)');
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    // Set initial
    setIsMobile(mq.matches);
    // Listen for changes
    if (mq.addEventListener) mq.addEventListener('change', onChange);
    else mq.addListener(onChange as unknown as EventListener);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', onChange);
      else mq.removeListener(onChange as unknown as EventListener);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    const urlFor = (p: number) => pages ? pages(p, size) : (apiEndpoint ?? "");
    const fetchPage = async () => {
      if (page === 0) setIsLoading(true); else setIsLoadingMore(true);
      setError(null);
      try {
        const res = await axios.get<PaginatedResponse<Record<string, unknown>>>(urlFor(page));
        const data = res.data;
        if (!cancelled && data && Array.isArray(data.content)) {
          if (data.number === 0) setItems(data.content);
          else setItems(prev => [...prev, ...data.content]);
          setHasMore(data.number < data.totalPages - 1);
        }
      } catch (err) {
        if (axios.isAxiosError(err)) setError(err.response?.statusText || err.message);
        else setError("Failed to load data");
      } finally {
        if (!cancelled) {
          setIsLoading(false);
          setIsLoadingMore(false);
        }
      }
    };
    fetchPage();
    return () => { cancelled = true; };
  }, [page, pages, apiEndpoint, size]);

  const loadMore = () => {
    if (!isLoadingMore && hasMore && !isLoading) {
      setIsLoadingMore(true); // set immediately to block duplicate triggers
      setPage(p => p + 1);
    }
  };

  const retry = () => {
    setPage(0);
    setItems([]);
    setHasMore(true);
  };

  if (error) {
    return (
      <>
        <title>{title}</title>
        <Navbar />
        <div className="spacer" style={{ height: '80px' }}></div>
        <div className="d-flex justify-content-center align-items-center min-vh-100">
          <div className="alert alert-danger d-flex flex-column align-items-center">
            <p>Error loading {entityName}s: {error}</p>
            <button className="btn btn-outline-danger btn-sm mt-2" onClick={retry}>Try Again</button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <title>{title}</title>
      <Navbar />
      <div className="spacer" style={{ height: '80px' }}></div>
      <div className="d-flex flex-column align-items-center gap-4">
        <h1>{title}</h1>
        {isLoading && page === 0 ? (
          <Loading />
        ) : items.length > 0 ? (
          isMobile ? (
            <MobileTable
              data={items as unknown as TableData[]}
              columns={columns}
              entityName={entityName}
              idKey={idKey}
              onLoadMore={loadMore}
              hasMore={hasMore}
              isLoadingMore={isLoadingMore}
            />
          ) : (
            <Table
              data={items as unknown as TableData[]}
              columns={columns}
              entityName={entityName}
              idKey={idKey}
              onLoadMore={loadMore}
              hasMore={hasMore}
              isLoadingMore={isLoadingMore}
            />
          )
        ) : (
          <div className="alert alert-info">No {entityName}s available at the moment.</div>
        )}
      </div>
    </>
  );
}

export default PaginatedTablePage;
