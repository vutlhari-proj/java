import { useState, useCallback } from 'react';
import axios from '@/config/axios';

type HttpMethod = 'POST' | 'PUT' | 'DELETE';

interface UseMutateDataOptions<TResponse = unknown> {
  apiEndpoint: string;
  method?: HttpMethod;
  onSuccess?: (data: TResponse) => void;
  onError?: (error: string) => void;
}

interface MutateDataFunction<TRequest> {
  (payload?: TRequest): Promise<void>;
}

export function useMutateData<TRequest = unknown, TResponse = unknown>({
  apiEndpoint,
  method = 'POST',
  onSuccess,
  onError
}: UseMutateDataOptions<TResponse>) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<TResponse | null>(null);

  const mutateData: MutateDataFunction<TRequest> = useCallback(async (payload?: TRequest) => {
    // Validation for required parameters
    if (!apiEndpoint) {
      const errorMsg = 'API endpoint is required';
      setError(errorMsg);
      onError?.(errorMsg);
      return;
    }

    // For DELETE requests, payload is optional
    // For POST/PUT requests, payload is typically required
    if ((method === 'POST' || method === 'PUT') && payload === undefined) {
      const errorMsg = `${method} requests typically require a payload`;
      setError(errorMsg);
      onError?.(errorMsg);
      return;
    }

    setIsLoading(true);
    setError(null);
    setData(null);

    try {
      let response;
      
      switch (method) {
        case 'POST':
          response = await axios.post(apiEndpoint, payload, { withCredentials: true });
          break;
        case 'PUT':
          response = await axios.put(apiEndpoint, payload, { withCredentials: true });
          break;
        case 'DELETE':
          response = await axios.delete(apiEndpoint, payload ? { data: payload } : undefined);
          break;
        default:
          throw new Error(`Unsupported HTTP method: ${method}`);
      }

      console.log(`${method} request successful:`, response.data);
      setData(response.data as TResponse);
      onSuccess?.(response.data as TResponse);

    } catch (err) {
      console.error(`Error with ${method} request to ${apiEndpoint}:`, err);
      
      // Enhanced error handling
      let errorMessage = `${method} request failed`;
      if (axios.isAxiosError(err)) {
        const status = err.response?.status;
        if (status === 400) {
          errorMessage = 'Bad request - please check your data';
        } else if (status === 401) {
          errorMessage = 'Authentication required';
        } else if (status === 403) {
          errorMessage = 'Access forbidden';
        } else if (status === 404) {
          errorMessage = 'Resource not found';
        } else if (status === 409) {
          errorMessage = 'Conflict - resource already exists or has conflicts';
        } else if (status === 422) {
          errorMessage = 'Validation error - please check your input';
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
      onError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [apiEndpoint, method, onSuccess, onError]);

  const resetState = useCallback(() => {
    setError(null);
    setData(null);
    setIsLoading(false);
  }, []);

  return {
    mutateData,
    isLoading,
    error,
    data,
    resetState,
    // Convenience methods for specific operations
    post: method === 'POST' ? mutateData : undefined,
    put: method === 'PUT' ? mutateData : undefined,
    delete: method === 'DELETE' ? mutateData : undefined
  };
}

// Convenience hooks for specific methods
export function usePostData<TRequest = unknown, TResponse = unknown>(
  options: UseMutateDataOptions<TResponse>
) {
  return useMutateData<TRequest, TResponse>({ ...options, method: 'POST' });
}

export function usePutData<TRequest = unknown, TResponse = unknown>(
  options: UseMutateDataOptions<TResponse>
) {
  return useMutateData<TRequest, TResponse>({ ...options, method: 'PUT' });
}

export function useDeleteData<TRequest = unknown, TResponse = unknown>(
  options: UseMutateDataOptions<TResponse>
) {
  return useMutateData<TRequest, TResponse>({ ...options, method: 'DELETE' });
}