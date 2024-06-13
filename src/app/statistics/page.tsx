'use client'
import React, {useEffect, useState} from 'react';
import {Statistics} from "@/components/tables/Statistics";
import {StatisticProps} from "@/types/types";
import {useIsEmployer} from "@/providers";
import {
    RESUME_STATISTIC,
    SKILLS_STATISTIC_RESUME,
    SKILLS_STATISTIC_VACANCY,
    VACANCY_STATISTIC
} from "@/url/urls";
import TypeChanger from "@/components/TypeChanger";
import style from "@/components/styles/style.module.sass";
import {
    ArrowLeft,
    ArrowUp, ChevronDown,
    ChevronLeft,
    ChevronRight, ChevronsDown,
    ChevronsLeft,
    ChevronsRight,
    ChevronUp,
    CircleChevronUp, TrendingUp, UserRoundCog
} from "lucide-react";
import StatisticTips from "@/components/tips/StatisticTips";
import {off} from "next/dist/client/components/react-dev-overlay/pages/bus";
import {Button} from "@/components/ui/button";
import TableSwitchTips from "@/components/tips/TableSwitchTips";
const Page = () => {
    const {isEmployer} = useIsEmployer()
    const [isLoading, setIsLoading] = useState(true)
    const [offTips, setOffTips] = useState(true);
    const [offTableSwitchTips, setOffTableSwitchTips] = useState(true);
    const [dataStatistics, setDataStatistics] = useState<StatisticProps[]>([])
    const [fadeOut, setFadeOut] = useState(false);
    const [dataStatisticSkills,setDataStatisticSkills] = useState<StatisticProps[]>([])
    const [isBySkills, setIsBySkills] = useState(false)
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
                const response = await fetch(isEmployer ? SKILLS_STATISTIC_VACANCY : SKILLS_STATISTIC_RESUME, {
                })
                const data = await response.json();
                setDataStatisticSkills(data)
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
    const handleSwitchTable = () => {
        setIsBySkills(prev => !prev)
        setOffTableSwitchTips(false);
    };
    return (
        <div className={'flex flex-col items-center relative '}>
            <div className={'flex text-center relative'}>
                {!isBySkills ?
                    <div className={'flex'}>
                        <h1 className={'text-3xl flex-grow font-extrabold mt-4 p-2  rounded-2xl'}>Статистика по</h1>
                    </div>
                    :
                    <h1 className={'text-3xl flex-grow font-extrabold mt-4 p-2   rounded-2xl '}>Статистика по
                        <Button className={'text-2xl mx-2  font-extrabold p-2  rounded-2xl'}>
                            <div className={'flex gap-2'}>
                                <UserRoundCog className={'self-center'} />
                                Навыкам
                            </div>
                        </Button>
                        для
                    </h1>
                }
                <div className={'mt-2 relative'}>
                    <TypeChanger inSkillPage={isBySkills} setOffTips={handleSetOffTips}/>
                    {offTips &&
                        <StatisticTips setFadeOut={setFadeOut} fadeOut={fadeOut} isUp />
                    }
                </div>
                {isBySkills ?
                    <div className={'absolute -right-28 top-1/3 bottom-1/2'}>
                        <Button size={'sm'}  variant={"ghost"} onClick={() => (setIsBySkills(prev => !prev))} className={`rounded-2xl gap-x-1 ${offTableSwitchTips && style.blink} relative`}>
                            <p className={'self-center'}>Назад</p>
                            <ChevronsLeft />
                        </Button>

                    </div>
                    :
                    <div className={'flex self-center justify-center absolute -right-28 top-1/3'}>
                        <Button size={'sm'}  variant={"ghost"} onClick={handleSwitchTable} className={`rounded-2xl gap-x-1 ${offTableSwitchTips && style.blink}`}>
                            <p className={'self-center'}>Далее</p>
                            <ChevronsRight/>
                        </Button>
                        {offTableSwitchTips &&
                            <TableSwitchTips/>
                        }

                    </div>
                }
            </div>
            <div className={'w-[1000px]  '}>
                {!isBySkills ?
                    <Statistics data={dataStatistics} isEmployer={isEmployer}/>
                    :
                    <Statistics data={dataStatisticSkills}/>
                }
            </div>
        </div>
    );
};

export default Page;