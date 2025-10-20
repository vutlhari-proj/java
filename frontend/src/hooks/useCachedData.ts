import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';

interface UseCachedDataOptions {
  cacheKey: string;
  apiEndpoint: string;
  cacheDuration?: number; // in milliseconds
}

export function useCachedData<T>({ 
  cacheKey, 
  apiEndpoint, 
  cacheDuration = 5 * 60 * 1000 // 5 minutes default
}: UseCachedDataOptions) {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (forceRefresh = false) => {
    // Check localStorage first
    const cachedData = localStorage.getItem(cacheKey);
    const cacheTimestamp = localStorage.getItem(`${cacheKey}_timestamp`);
    
    if (!forceRefresh && cachedData && cacheTimestamp) {
      const isExpired = Date.now() - parseInt(cacheTimestamp) > cacheDuration;
      if (!isExpired) {
        console.log(`Loading ${cacheKey} from cache`);
        setData(JSON.parse(cachedData));
        return;
      }
    }
    
    // Only fetch if not already loading
    if (isLoading) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await axios.get<T[]>(apiEndpoint);
      console.log("API Response:", response.data);
      console.log("Is array:", Array.isArray(response.data));
      
      // Cache the data
      localStorage.setItem(cacheKey, JSON.stringify(response.data));
      localStorage.setItem(`${cacheKey}_timestamp`, Date.now().toString());
      
      setData(response.data);
    } catch (err) {
      console.error(`Error fetching ${cacheKey}:`, err);
      setError(err instanceof Error ? err.message : 'An error occurred');
      setData([]); // Set empty array on error
    } finally {
      setIsLoading(false);
    }
  }, [cacheKey, apiEndpoint, cacheDuration, isLoading]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const clearCache = useCallback(() => {
    localStorage.removeItem(cacheKey);
    localStorage.removeItem(`${cacheKey}_timestamp`);
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