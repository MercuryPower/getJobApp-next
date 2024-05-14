'use client'
import React from 'react';
import VacancyCards from "@/components/VacancyCards";
import VacancyCardSkeleton from "@/components/ui/skeletons/VacancyCardSkeleton";
import Search from "@/components/ui/search";
import {useApiGet} from "@/hooks/useFetching";
import {ComboboxCity} from "@/components/ui/combobox";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import PaginationSection from "@/components/sections/PaginationSection";


const Page = ({searchParams,}:{searchParams?:{query?: string; page?:string, perPage?:string}}) => {
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
                        <VacancyCards page={currentPage} query={query} data={data}/>
                        :
                        <VacancyCardSkeleton />
                    }
                    <PaginationSection currentPage={currentPage}/>
                    </div>
                    <div className={'flex flex-col justify-items-center shadow-lg m-4 p-4 border text-center  rounded-2xl space-y-2 w-60 '}>
                        <h2 className={'font-bold text-xl'}>Фильтр</h2>
                        <div className={'space-y-4 pt-6'}>
                            <div className={'space-y-2'}>
                                <h3 className={'text-lg'}>Город:</h3>
                                <ComboboxCity  />
                            </div>
                            <div className={'space-y-2'}>
                                <h3 className={'text-lg'}>Тип занятости</h3>
                                <Select>
                                    <SelectTrigger className="w-[200px]">
                                        <SelectValue placeholder="Выберите тип занятости" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Fruits</SelectLabel>
                                            <SelectItem value="apple"></SelectItem>
                                            <SelectItem value="banana">Banana</SelectItem>
                                            <SelectItem value="blueberry">Blueberry</SelectItem>
                                            <SelectItem value="grapes">Grapes</SelectItem>
                                            <SelectItem value="pineapple">Pineapple</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default Page;