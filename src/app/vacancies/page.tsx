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
    skills:{
        id:number;
        skill:string;
    }[]
    cities:{
        id:number;
        city:string;
    }[]
    exp:string;
}

const Page = () => {
    const [data, setData] = useState<VacancyInfo[]>([])
    const [isLoading, setIsLoading] = useState(false);
    async function getVacancies() {
        try {
            setIsLoading(true);
            const res = await fetch(`http://127.0.0.1:8000/vacancies`, {
            })
            if(res){
                const jsonData = await res.json();
                setData(jsonData);
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
                        {!isLoading && data.length > 0 ? <VacancyCard data={data}/> : <Skeleton className=" w-[850px] h-[500px] rounded-2xl"/>}
                </div>
            </div>
        </>
    );
};

export default Page;