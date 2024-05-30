'use client'
import React, {useEffect, useState} from 'react';
import {Statistics} from "@/components/tables/Statistics";
import {StatisticProps} from "@/types/types";
import {useIsEmployer} from "@/components/providers";
import {RESUME_STATISTIC, VACANCY_STATISTIC} from "@/url/urls";

const Page = () => {
    const {isEmployer} = useIsEmployer()
    const [dataVacancyStatistics, setDataVacancyStatistics] = useState<StatisticProps[]>([])
    useEffect(() => {

        const fetchStatisticVacancy = async () => {
            try {
                {isEmployer}
                const response = await fetch(`${isEmployer ? `${VACANCY_STATISTIC}`: `${RESUME_STATISTIC}`}`, {
                    cache: 'force-cache',
                    next: {revalidate: 1800}
                })
                const data = await response.json();
                setDataVacancyStatistics(data)
            } catch (e) {
                throw new Error((e as Error).message)
            }
        }
        void fetchStatisticVacancy()
    },[])
    return (
        <div className={'flex flex-col items-center '}>
            <h1 className={'text-3xl font-extrabold mt-4 p-2  rounded-2xl'}>Статистика</h1>
            <div className={'w-[900px]'}>
                <Statistics data={dataVacancyStatistics} />
            </div>

        </div>
    );
};

export default Page;