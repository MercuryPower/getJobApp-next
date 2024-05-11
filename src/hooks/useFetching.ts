import { useState, useEffect } from 'react';

interface FetchState<T> {
    data: T | null;
    isLoading: boolean;
    error: string | null;
}

const useFetch = <T>(url: string, options?: RequestInit): FetchState<T> => {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(url, options);
                if (!res.ok) {
                    throw new Error('Failed to fetch data');
                }
                const responseData: T = await res.json();
                setData(responseData);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                }
            } finally {
                setIsLoading(false);
            }
        };

        void fetchData();
    }, [url, options]);

    return { data, isLoading, error };
};

export default useFetch;