'use client'
import React, {Suspense, useEffect, useState} from 'react';
import VacancyCards from "@/components/VacancyCards";
import {Skeleton} from "@/components/ui/skeleton";
import {Button} from "@/components/ui/button";
import {VacancyInfo} from "@/types/types";
import VacancyCardSkeleton from "@/components/ui/skeletons/VacancyCardSkeleton";
import Search from "@/components/search";
import {useApiGet} from "@/hooks/useFetching";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis, PaginationItem,
    PaginationLink, PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";


const Page = ({searchParams,}:{searchParams?:{query?: string; page?:string}}) => {
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;

    const { data, error } = useApiGet(`http://127.0.0.1:8000/vacancies`, { cache: 'force-cache', next: { revalidate: 1800 } });
    return (
        <>
            <div className={'flex flex-col items-center '}>
                <div className={'mt-8 h-14 rounded max-w-lg w-full '}>
                    <Search placeholder="Например: Backend специалист" />
                </div>
                <div className={'rounded-2xl m-2 flex'}>
                    <div className={'flex flex-col  justify-center shadow-lg m-4 p-4 border rounded-2xl '}>
                    {data ?
                        <VacancyCards query={query} data={data}/>
                        :
                        <VacancyCardSkeleton />
                    }
                        <Pagination>
                            <PaginationContent className={'text-lg'}>
                                <PaginationItem>
                                    <PaginationPrevious href="#" />
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink href="vacancies?page=1" isActive>1</PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink href="vacancies?page=2" >
                                        2
                                    </PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink href="#">3</PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationEllipsis />
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationNext href="#" />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
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