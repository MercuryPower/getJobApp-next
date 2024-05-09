'use client'
import React, {useEffect, useState} from 'react';
import VacancyCard from "@/components/VacancyCard";
import {Skeleton} from "@/components/ui/skeleton";
export interface VacancyInfo {
    id: number;
    companyName: string;
    vacancyName:string;
    salary?: string;
    tp?:string;
    skills:string[];
    cities:{
        city:string
    }[]
    exp:string;
}

const Page = () => {
    const [data, setData] = useState<VacancyInfo[]>([])
    const [isLoading, setIsLoading] = useState(false);
    async function getVacancies() {
        try {
            setIsLoading(true);
            const res = await fetch(`https://jsonplaceholder.typicode.com/comments`, {
                cache:'force-cache',
                method:'GET'
            })
            if(res.ok){
                const jsonData = await res.json();
                if (Array.isArray(jsonData)) {
                    setData(jsonData);
                } else if (jsonData) {
                    setData([jsonData]);
                }
            }
        }
        catch(error){
            throw new Error('Failed to fetch data')
        }
        finally {
            setIsLoading(false)
        }

    }

    useEffect(() => {
        getVacancies()
    }, [])
    console.log(data)
    return (
        <>
            <div className={'flex flex-col items-center justify-center m-12'}>
                <div className={'flex self-center m-4 mt-7 h-14 rounded'}>
                    <input className={'w-96 flex p-2 text-xl rounded-l '}></input>
                    <button
                        className={'flex text-white bg-green-600 p-4 gap-1 rounded-r-lg self-center font-bold hover:opacity-70 transition'}>
                        Найти
                    </button>
                </div>
                <div className={'h-dvh rounded m-4'}>
                        {!isLoading ? <VacancyCard data={data}/> : <Skeleton className="w-[100px] h-[400px] rounded-2xl" /> }
                </div>
            </div>
        </>
    );
};

export default Page;