
import { useState, useEffect } from 'react';

export type TApiResponse = {
    status: Number;
    statusText: String;
    data: any;
    error: any;
    loading: Boolean;
};

export const useApiGet = (url: string, options?:RequestInit): TApiResponse => {
    const [status, setStatus] = useState<Number>(0);
    const [statusText, setStatusText] = useState<String>('');
    const [data, setData] = useState<any>();
    const [error, setError] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);



    useEffect(() => {
        const getAPIData = async () => {
            setLoading(true);
            try {
                const apiResponse = await fetch(url, {
                    cache:'force-cache',
                    next:{revalidate:600}
                });
                const json = await apiResponse.json();
                setStatus(apiResponse.status);
                setStatusText(apiResponse.statusText);
                setData(json);
            } catch (error) {
                setError(error);
            }
            setLoading(false);
        };
        void getAPIData()
    }, [url]);

    return { status, statusText, data, error, loading };
};