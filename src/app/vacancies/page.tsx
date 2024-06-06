'use client'
import React, {useEffect, useState} from 'react';
import VacancyCards from "@/components/VacancyCards";
import VacancyCardSkeleton from "@/components/ui/skeletons/VacancyCardSkeleton";
import Search from "@/components/ui/search";
import {useApiGet} from "@/hooks/useFetching";
import {ComboboxCity} from "@/components/filter/ComboboxCities";
import PaginationSection from "@/components/sections/PaginationSection";
import {GET_VACANCIES} from "@/url/urls";
import SelectTypeOfEmploy from "@/components/filter/SelectTypeOfEmploy";
import MultiselectSkills from "@/components/filter/MultiselectSkills";
import SalarySlider from "@/components/filter/SalarySlider";
import {Button} from "@/components/ui/button";
import {Form} from "@/components/ui/form";
import VacancyFilter from "@/components/filter/VacancyFilter";
import {usePathname, useRouter} from "next/navigation";
import {useAuth} from "@/components/providers";
import {ChevronsRight} from "lucide-react";


const Page = ({searchParams}:{searchParams?:{query?: string; page?:string, perPage?:string}}) => {
    const [queryString, setQueryString] = useState('');

    const handleQueryChange = (query: string) => {
        setQueryString(query);
    };
    const {user} = useAuth();
    const pathname = usePathname();
    const router = useRouter();
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const { data } = useApiGet(GET_VACANCIES, { cache: 'force-cache', next: { revalidate: 1800 } });
    return (
        <>
            <div className={'flex flex-col items-center '}>
                <h1 className={'text-3xl font-extrabold mt-4 p-2  rounded-2xl'}>Вакансии</h1>
                <div className={'mt-8 h-14 rounded max-w-lg w-full '}>
                    <Search placeholder="Например: Backend специалист" />
                </div>
                <div className={'rounded-2xl m-2 flex'}>
                    <div className={'flex flex-col  shadow-lg m-4 p-4 border rounded-2xl '}>
                        {user?.type === 'user' &&
                            <div className={'flex justify-end gap-x-2'}>
                                <div className={'self-center opacity-75 text-center font-bold'}>
                                    <h5>Не нашли подходящую  вакансию?</h5>
                                    <h5>Создайте её уже сейчас</h5>
                                </div>
                                <div className={'flex'}>
                                    <ChevronsRight size={32} className={'self-center ml-1 bg'} />
                                </div>
                                <Button onClick={() => router.push(`jobseekers/create`)}  type={'button'} size={"lg"} className={"h-12 border-black bg-green-600 rounded font-bold transition flex items-center justify-center space-x-2"} >
                                    <svg width="30" height="30" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                                    <span>Создать резюме</span>
                                </Button>
                            </div>
                        }
                    {data ?
                        <VacancyCards queryString={queryString} page={currentPage} query={query} data={data}/>
                        :
                        <VacancyCardSkeleton />
                    }
                        <PaginationSection queryString={queryString} query={query} currentPage={currentPage}/>
                    </div>
                    <VacancyFilter onQueryChange={handleQueryChange}  query={query}/>
                </div>
            </div>
        </>
    );
};

export default Page;