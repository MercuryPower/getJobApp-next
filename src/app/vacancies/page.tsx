'use client'
import React, {useEffect} from 'react';
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
import {useRouter} from "next/navigation";
import {useAuth} from "@/components/providers";


const Page = ({searchParams,}:{searchParams?:{query?: string; page?:string, perPage?:string}}) => {
    const {user} = useAuth();
    const router = useRouter();
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const { data } = useApiGet(GET_VACANCIES, { cache: 'force-cache', next: { revalidate: 1800 } });
    return (
        <>
            <div className={'flex flex-col items-center '}>
                <div className={'mt-8 h-14 rounded max-w-lg w-full '}>
                    <Search placeholder="Например: Backend специалист" />
                </div>
                <div className={'rounded-2xl m-2 flex'}>
                    <div className={'flex flex-col  justify-center shadow-lg m-4 p-4 border rounded-2xl '}>
                        {user?.type === 'company' &&
                            <div className={'flex justify-end'}>
                                <Button onClick={() => router.push('vacancies/create')}  type={'button'} size={"lg"} className={"h-12 border-black bg-green-600 rounded font-bold transition flex items-center justify-center space-x-2"} >
                                    <svg width="30" height="30" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                                    <span>Создать вакансию</span>
                                </Button>
                            </div>
                        }
                    {data ?
                        <VacancyCards page={currentPage} query={query} data={data}/>
                        :
                        <VacancyCardSkeleton />
                    }
                    <PaginationSection currentPage={currentPage}/>
                    </div>
                    <VacancyFilter />
                </div>
            </div>
        </>
    );
};

export default Page;