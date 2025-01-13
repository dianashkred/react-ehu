import { useState, useEffect } from 'react';

interface FetchOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: string;
}

interface ResponseState {
  error: string | null;
  status: number | null;
}

interface UseFetchReturn<T> {
  data: T | null;
  isLoading: boolean;
  responseState: ResponseState;
}

const useFetch =  <T,>(url: string, options: FetchOptions = {}): UseFetchReturn<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [responseState, setResponseState] = useState<ResponseState>({ error: null, status: null });

  const logApiCall = (url: string, payload: any, responseStatus: number | string, result: any) => {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      request: {
        url,
        payload,
      },
      response: {
        status: responseStatus,
        data: result,
      },
    };

    const apiLogs = JSON.parse(localStorage.getItem('apiLogs') || '[]');
    apiLogs.push(logEntry);

    if (apiLogs.length > 50) apiLogs.shift();

    localStorage.setItem('apiLogs', JSON.stringify(apiLogs));
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(url, options);
        const result = await response.json()
        //setStatus(response.status);

        logApiCall(url, options.body, response.status, result);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        setData(result);
        setResponseState({ error: null, status: response.status });
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        setResponseState({ error: errorMessage, status: null });
        logApiCall(url, options.body, 'Error', { error: errorMessage });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, options]);

  return { data, isLoading, responseState };
};

export default useFetch;
