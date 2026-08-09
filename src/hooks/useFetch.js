import { useState, useEffect, useRef, useCallback } from 'react';

// Global cache storing entries as: Map<url, { data: any, timestamp: number }>
const cache = new Map();

/**
 * Custom hook for API fetching with TTL-based caching and request cancellation
 * @param {string} url - API endpoint URL
 * @param {Object} options - Standard fetch options + optional `ttl` (Time-To-Live in ms)
 * @param {number} [options.ttl=300000] - Cache expiration time in milliseconds (default: 5 minutes)
 */
export default function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Destructure TTL (default: 5 mins / 300,000 ms) and separate standard fetch options
  const { ttl = 5 * 60 * 1000, ...fetchOptions } = options;

  const optionsRef = useRef(fetchOptions);

  useEffect(() => {
    optionsRef.current = fetchOptions;
  }, [fetchOptions]);

  const fetchData = useCallback(
    async (ignoreCache = false) => {
      if (!url) return;

      if (cache.has(url) && !ignoreCache) {
        const cachedEntry = cache.get(url);
        const isExpired = Date.now() - cachedEntry.timestamp > ttl;

        if (!isExpired) {
          setData(cachedEntry.data);
          setLoading(false);
          setError(null);
          return;
        }

        cache.delete(url);
      }

      setLoading(true);
      setError(null);

      const controller = new AbortController();
      const { signal } = controller;

      try {
        const response = await fetch(url, {
          ...optionsRef.current,
          signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
        }

        const json = await response.json();

        cache.set(url, {
          data: json,
          timestamp: Date.now(),
        });

        setData(json);
        setError(null);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'An unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }

      return () => controller.abort();
    },
    [url, ttl]
  );

  useEffect(() => {
    const controller = new AbortController();
    let didCancel = false;

    const load = async () => {
      if (!url) return;

      if (cache.has(url)) {
        const cachedEntry = cache.get(url);
        const isExpired = Date.now() - cachedEntry.timestamp > ttl;

        if (!isExpired) {
          if (!didCancel) {
            setData(cachedEntry.data);
            setLoading(false);
            setError(null);
          }
          return;
        }

        cache.delete(url);
      }

      if (!didCancel) {
        setLoading(true);
        setError(null);
      }

      try {
        const response = await fetch(url, {
          ...optionsRef.current,
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
        }

        const json = await response.json();

        cache.set(url, {
          data: json,
          timestamp: Date.now(),
        });

        if (!didCancel) {
          setData(json);
          setError(null);
        }
      } catch (err) {
        if (!didCancel && err.name !== 'AbortError') {
          setError(err.message || 'An unexpected error occurred');
        }
      } finally {
        if (!didCancel) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      didCancel = true;
      controller.abort();
    };
  }, [url, ttl, fetchOptions]);

  const refetch = useCallback(() => {
    return fetchData(true);
  }, [fetchData]);

  return { data, loading, error, refetch };
}