import { useState, useCallback, useEffect, useRef } from 'react';
import axios from 'axios';

interface UseCachedDataOptions<T> {
  cacheKey: string;
  apiEndpoint: string;
  cacheDuration?: number; // in milliseconds
  defaultValue?: T[];
}

export function useCachedData<T>({ 
  cacheKey, 
  apiEndpoint, 
  cacheDuration = 5 * 60 * 1000, // 5 minutes default
  defaultValue = []
}: UseCachedDataOptions<T>) {
  const [data, setData] = useState<T[]>(defaultValue);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isFetchingRef = useRef(false);

  // Helper function to safely parse cached data
  const parseCachedData = useCallback((cachedData: string): T[] | null => {
    try {
      const parsed = JSON.parse(cachedData);
      return Array.isArray(parsed) ? parsed : null;
    } catch (error) {
      console.warn(`Failed to parse cached data for ${cacheKey}:`, error);
      return null;
    }
  }, [cacheKey]);

  const fetchData = useCallback(async (forceRefresh = false) => {
    // Validation for required parameters
    if (!cacheKey || !apiEndpoint) {
      setError('Cache key and API endpoint are required');
      return;
    }

    // Prevent concurrent fetches
    if (isFetchingRef.current) {
      return;
    }

    // Check localStorage first
    const cachedData = localStorage.getItem(cacheKey);
    const cacheTimestamp = localStorage.getItem(`${cacheKey}_timestamp`);
    
    if (!forceRefresh && cachedData && cacheTimestamp) {
      const isExpired = Date.now() - parseInt(cacheTimestamp) > cacheDuration;
      if (!isExpired) {
        console.log(`Loading ${cacheKey} from cache`);
        const parsed = parseCachedData(cachedData);
        if (parsed !== null) {
          setData(parsed);
          return;
        }
      }
    }
    
    isFetchingRef.current = true;
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await axios.get<T[]>(apiEndpoint);
      console.log("API Response:", response.data);
      
      // Validate response data
      if (!Array.isArray(response.data)) {
        throw new Error('Expected array response from API');
      }
      
      // Cache the data
      localStorage.setItem(cacheKey, JSON.stringify(response.data));
      localStorage.setItem(`${cacheKey}_timestamp`, Date.now().toString());
      
      setData(response.data);
    } catch (err) {
      console.error(`Error fetching ${cacheKey}:`, err);
      
      // Enhanced error handling
      if (axios.isAxiosError(err)) {
        const status = err.response?.status;
        if (status === 404) {
          setError('Data not found');
        } else if (status === 401) {
          setError('Authentication required');
        } else if (status === 403) {
          setError('Access forbidden');
        } else if (status && status >= 500) {
          setError('Server error - please try again later');
        } else {
          setError(`Request failed: ${err.response?.statusText || err.message}`);
        }
      } else {
        setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      }
      
      setData([]); // Set empty array on error instead of defaultValue
    } finally {
      isFetchingRef.current = false;
      setIsLoading(false);
    }
  }, [cacheKey, apiEndpoint, cacheDuration, parseCachedData]);

  useEffect(() => {
    if (cacheKey && apiEndpoint) {
      fetchData();
    }
  }, [fetchData, cacheKey, apiEndpoint]);

  const clearCache = useCallback(() => {
    localStorage.removeItem(cacheKey);
    localStorage.removeItem(`${cacheKey}_timestamp`);
  }, [cacheKey]);

  // Helper functions for better data state management
  const isEmpty = useCallback(() => {
    return !data || data.length === 0;
  }, [data]);

  const hasData = useCallback(() => {
    return data && data.length > 0;
  }, [data]);

  const resetData = useCallback(() => {
    setData([]);
    setError(null);
  }, []);

  return {
    data,
    isLoading,
    error,
    fetchData,
    clearCache,
    refetch: () => fetchData(true),
    isEmpty,
    hasData,
    resetData
  };
}