import { useState, useCallback, useEffect, useRef } from 'react';
import axios from 'axios';

interface UseSessionDataOptions<T> {
  cacheKey: string;
  apiEndpoint: string;
  isArray?: boolean; // Specify if expecting array or single object
  defaultValue?: T | T[]; // Custom default value
}

export function useSessionData<T>({ 
  cacheKey, 
  apiEndpoint,
  isArray = true,
  defaultValue
}: UseSessionDataOptions<T>) {
  const [data, setData] = useState<T | T[]>(() => {
    if (defaultValue !== undefined) return defaultValue;
    return isArray ? [] : null as T;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isFetchingRef = useRef(false);

  const fetchData = useCallback(async (forceRefresh = false) => {
    // Validate required parameters
    if (!cacheKey || !apiEndpoint) {
      setError('Missing cache key or API endpoint');
      return;
    }

    // Prevent concurrent fetches
    if (isFetchingRef.current) {
      return;
    }

    // Check sessionStorage first
    const cachedData = sessionStorage.getItem(cacheKey);
    
    if (!forceRefresh && cachedData) {
      try {
        const parsedData = JSON.parse(cachedData);
        console.log(`Loading ${cacheKey} from session cache`);
        setData(parsedData);
        return;
      } catch (parseError) {
        console.warn(`Failed to parse cached data for ${cacheKey}:`, parseError);
        // Continue to fetch fresh data
      }
    }
    
    isFetchingRef.current = true;
    setIsLoading(true);
    setError(null);
    
    try {
      const response = isArray 
        ? await axios.get<T[]>(apiEndpoint)
        : await axios.get<T>(apiEndpoint);
      
      // Validate response data
      if (response.data === null || response.data === undefined) {
        throw new Error('No data received from server');
      }

      // Additional validation for arrays
      if (isArray && !Array.isArray(response.data)) {
        throw new Error('Expected array but received non-array data');
      }
      
      // Cache the data in sessionStorage
      sessionStorage.setItem(cacheKey, JSON.stringify(response.data));
      
      setData(response.data);
    } catch (err) {
      console.error(`Error fetching ${cacheKey}:`, err);
      
      // Enhanced error handling
      let errorMessage = 'An error occurred';
      if (axios.isAxiosError(err)) {
        const status = err.response?.status;
        if (status === 404) {
          errorMessage = `${isArray ? 'Data' : 'Item'} not found`;
        } else if (status === 401) {
          errorMessage = 'Authentication required';
        } else if (status === 403) {
          errorMessage = 'Access forbidden';
        } else if (status && status >= 500) {
          errorMessage = 'Server error - please try again later';
        } else if (err.code === 'NETWORK_ERROR' || !err.response) {
          errorMessage = 'Network error - please check your connection';
        } else {
          errorMessage = `Request failed: ${err.response?.statusText || err.message}`;
        }
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      setData(isArray ? [] : null as T); // Use consistent default instead of defaultValue
    } finally {
      isFetchingRef.current = false;
      setIsLoading(false);
    }
  }, [cacheKey, apiEndpoint, isArray]);

  useEffect(() => {
    if (cacheKey && apiEndpoint) {
      fetchData();
    }
  }, [fetchData, cacheKey, apiEndpoint]);

  const clearCache = useCallback(() => {
    if (cacheKey) {
      sessionStorage.removeItem(cacheKey);
    }
  }, [cacheKey]);

  const resetData = useCallback(() => {
    setData(isArray ? [] : null as T);
    setError(null);
  }, [isArray]);

  return {
    data,
    isLoading,
    error,
    fetchData,
    clearCache,
    resetData,
    refetch: () => fetchData(true),
    // Helper functions for type safety
    isEmpty: isArray ? (data as T[]).length === 0 : data === null,
    hasData: isArray ? (data as T[]).length > 0 : data !== null
  };
}