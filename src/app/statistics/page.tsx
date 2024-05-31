'use client'
import React, {useEffect, useState} from 'react';
import {Statistics} from "@/components/tables/Statistics";
import {StatisticProps} from "@/types/types";
import {useIsEmployer} from "@/components/providers";
import {RESUME_STATISTIC, VACANCY_STATISTIC} from "@/url/urls";
import {Button} from "@/components/ui/button";
import {BriefcaseBusiness, UsersRound} from "lucide-react";

const Page = () => {
    const [isLoading, setIsLoading] = useState(true)
    const {isEmployer, setIsEmployer} = useIsEmployer()
    const [dataStatistics, setDataStatistics] = useState<StatisticProps[]>([])
    useEffect(() => {
        const fetchStatisticVacancy = async () => {
            try {
                const response = await fetch(`${isEmployer ? `${VACANCY_STATISTIC}`: `${RESUME_STATISTIC}`}`, {
                    cache: 'force-cache',
                    next: {revalidate: 900}
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
                    <Button className={'self-center text-2xl flex-grow font-extrabold mt-4 p-2  rounded-2xl'} onClick={() => setIsEmployer((prev) => !prev)}>
                        {isEmployer ?
                            (
                                <div className={'flex gap-2'}>
                                    <UsersRound className={'self-center'} />
                                    Вакансии
                                </div>
                             )
                            :
                            (
                                <div className={'flex gap-2'}>
                                    <BriefcaseBusiness className={'self-center'} />
                                    Соискатели
                                </div>
                            )
                        }
                    </Button>
            </div>
            <div className={'w-[900px]'}>
                <Statistics data={dataStatistics} />
            </div>
        </div>
    );
};

export default Page;