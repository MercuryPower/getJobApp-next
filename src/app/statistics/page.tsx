'use client'
import React, {useEffect, useState} from 'react';
import {Statistics} from "@/components/tables/Statistics";
import {ResumeStatisticProps, VacancyStatisticProps} from "@/types/types";
import {useIsEmployer} from "@/components/providers";
import {RESUME_STATISTIC, VACANCY_STATISTIC} from "@/url/urls";
import TypeChanger from "@/components/TypeChanger";

const Page = () => {
    const {isEmployer} = useIsEmployer()
    const [isLoading, setIsLoading] = useState(true)

    const [dataStatistics, setDataStatistics] = useState<VacancyStatisticProps[] | ResumeStatisticProps[]>([])
    useEffect(() => {
        const fetchStatisticVacancy = async () => {
            try {
                setIsLoading(true)
                const response = await fetch(isEmployer ? VACANCY_STATISTIC : RESUME_STATISTIC, {
                })
                const data = await response.json();
                setDataStatistics(data)
            } catch (e) {
                throw new Error((e as Error).message)
            }
            setIsLoading(false)
        }
        void fetchStatisticVacancy()
    },[isEmployer])
    return (
        <div className={'flex flex-col items-center '}>
            <div className={'flex'}>
                <h1 className={'text-3xl flex-grow font-extrabold mt-4 p-2  rounded-2xl'}>Статистика</h1>
                <TypeChanger/>
            </div>
            <div className={'w-[900px]'}>
                <Statistics data={dataStatistics} isEmployer={isEmployer}/>
            </div>
        </div>
    );
};

export default Page;