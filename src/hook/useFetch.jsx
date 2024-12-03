import React, { useState, useEffect } from 'react';

const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState(null);

  const logApiCall = (url, payload, responseStatus, result) => {
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

    const apiLogs = JSON.parse(localStorage.getItem('apiLogs')) || [];
    apiLogs.push(logEntry);

    if (apiLogs.length > 50) apiLogs.shift();

    localStorage.setItem('apiLogs', JSON.stringify(apiLogs));
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(url, options);
        setStatus(response.status);

        const result = await response.json();

        logApiCall(url, options.body, response.status, result);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        setData(result);
      } catch (err) {
        setError(err.message);
        logApiCall(url, options.body, 'Error', { error: err.message });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, options]);

  return { data, error, isLoading, status };
};

export default useFetch;
