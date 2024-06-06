'use client'
import React, {useEffect, useState} from 'react';
import {Statistics} from "@/components/tables/Statistics";
import {StatisticProps} from "@/types/types";
import {useIsEmployer} from "@/components/providers";
import {RESUME_STATISTIC, SKILLS_STATISTIC, VACANCY_STATISTIC} from "@/url/urls";
import TypeChanger from "@/components/TypeChanger";
import {ArrowLeft, ArrowUp, ChevronUp, CircleChevronUp} from "lucide-react";
import StatisticTips from "@/components/tips/StatisticTips";
import {off} from "next/dist/client/components/react-dev-overlay/pages/bus";
const Page = () => {
    const {isEmployer} = useIsEmployer()
    const [isLoading, setIsLoading] = useState(true)
    const [offTips, setOffTips] = useState(true);
    const [dataStatistics, setDataStatistics] = useState<StatisticProps[]>([])
    const [fadeOut, setFadeOut] = useState(false);
    const [dataSkills,setDataSkills] = useState<StatisticProps[]>([])
    useEffect(() => {
        const fetchStatisticVacancy = async () => {
            try {
                setIsLoading(true)
                const response = await fetch(isEmployer ? VACANCY_STATISTIC : RESUME_STATISTIC, {
                    cache:'force-cache',
                    next:{revalidate:600}
                })
                const data = await response.json();
                setDataStatistics(data)
                console.log(dataStatistics)
            } catch (e) {
                throw new Error((e as Error).message)
            }
            setIsLoading(false)
        }
        void fetchStatisticVacancy()
        const fetchStatisticSkills = async () => {
            try {
                setIsLoading(true)
                const response = await fetch(SKILLS_STATISTIC, {
                })
                const data = await response.json();
                setDataSkills(data)
            } catch (e) {
                throw new Error((e as Error).message)
            }
            setIsLoading(false)
        }
        void fetchStatisticSkills()
    },[isEmployer])
    const handleSetOffTips = () => {
        setFadeOut(true);
        setTimeout(() => {
            setOffTips(false);
        }, 750);
    };
    return (
        <div className={'flex flex-col items-center '}>
            <div className={'flex'}>
                <h1 className={'text-3xl flex-grow font-extrabold mt-4 p-2  rounded-2xl'}>Статистика по</h1>
                <div className={'mt-2 relative'}>
                    <TypeChanger setOffTips={handleSetOffTips}/>
                    {offTips &&
                      <StatisticTips fadeOut={fadeOut} isUp />
                    }
                </div>
            </div>
            <div className={'w-[1000px]'}>
                <Statistics data={dataStatistics} isEmployer={isEmployer}/>
            </div>
        </div>
    );
};

export default Page;