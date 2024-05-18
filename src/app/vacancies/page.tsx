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


const Page = ({searchParams,}:{searchParams?:{query?: string; page?:string, perPage?:string}}) => {
    const router = useRouter();
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const { data, error } = useApiGet(GET_VACANCIES, { cache: 'force-cache', next: { revalidate: 1800 } });
    return (
        <>
            <div className={'flex flex-col items-center '}>
                <div className={'mt-8 h-14 rounded max-w-lg w-full '}>
                    <Search placeholder="Например: Backend специалист" />
                </div>
                <div className={'rounded-2xl m-2 flex'}>
                    <div className={'flex flex-col  justify-center shadow-lg m-4 p-4 border rounded-2xl '}>
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