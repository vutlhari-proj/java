import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';

interface UseSessionDataOptions {
  cacheKey: string;
  apiEndpoint: string;
}

export function useSessionData<T>({ 
  cacheKey, 
  apiEndpoint
}: UseSessionDataOptions) {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (forceRefresh = false) => {
    // Check sessionStorage first
    const cachedData = sessionStorage.getItem(cacheKey);
    
    if (!forceRefresh && cachedData) {
      console.log(`Loading ${cacheKey} from session cache`);
      setData(JSON.parse(cachedData));
      return;
    }
    
    // Only fetch if not already loading
    if (isLoading) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await axios.get<T[]>(apiEndpoint);
      
      // Cache the data in sessionStorage (no timestamp needed)
      sessionStorage.setItem(cacheKey, JSON.stringify(response.data));
      
      setData(response.data);
    } catch (err) {
      console.error(`Error fetching ${cacheKey}:`, err);
      setError(err instanceof Error ? err.message : 'An error occurred');
      setData([]);
    } finally {
      setIsLoading(false);
    }
  }, [cacheKey, apiEndpoint, isLoading]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const clearCache = useCallback(() => {
    sessionStorage.removeItem(cacheKey);
  }, [cacheKey]);

  return {
    data,
    isLoading,
    error,
    fetchData,
    clearCache,
    refetch: () => fetchData(true)
  };
}