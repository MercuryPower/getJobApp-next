'use client'
import React, {Suspense, useEffect, useState} from 'react';
import VacancyCards from "@/components/VacancyCards";
import {Skeleton} from "@/components/ui/skeleton";
import {Button} from "@/components/ui/button";
import {VacancyInfo} from "@/types/types";
import VacancyCardSkeleton from "@/components/ui/skeletons/VacancyCardSkeleton";
import Search from "@/components/search";
import useFetch from "@/hooks/useFetching";
import {Pagination} from "@/components/ui/pagination";


const Page = ({searchParams,}:{searchParams?:{query?: string; page?:string}}) => {
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;

    const { data, isLoading, error } = useFetch<VacancyInfo[]>(`http://127.0.0.1:8000/vacancies?query=${query}&page=${currentPage}`, { cache: 'force-cache', next: { revalidate: 900 } });

    return (
        <>
            <div className={'flex flex-col items-center '}>
                <div className={'mt-8 h-14 rounded max-w-lg w-full '}>
                    <Search placeholder="Например: Backend специалист" />
                </div>
                <div className={'rounded-2xl m-2 flex'}>
                    <div className={'flex justify-center shadow-lg m-4 p-4 border rounded-2xl '}>
                    {data ?
                        <VacancyCards query={query} data={data}/>
                        :
                        <VacancyCardSkeleton />
                    }
                    </div>
                    <div className={'flex justify-center shadow-lg m-4 p-4 border rounded-2xl w-60 '}>
                        <div>
                            <span className={'font-bold'}>Фильтр</span>
                        </div>
                        <div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Page;