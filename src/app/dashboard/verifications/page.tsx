'use client'
import React, {useEffect, useState} from 'react';
import {Statistics} from "@/components/tables/Statistics";
import {
    GET_VERIFICATIONS_CITIES,
    GET_VERIFICATIONS_SKILLS,
    GET_VERIFICATIONS_VACANCY_NAMES,
    RESUME_STATISTIC,
    VACANCY_STATISTIC
} from "@/url/urls";
import {StatisticProps, VerificationProps} from "@/types/types";
import {Separator} from "@/components/ui/separator";
import {useAuth} from "@/providers";
import notFound from "@/app/not-found";

const Page = () => {
    const {user} = useAuth()
    const [isLoading, setIsLoading] = useState(true)
    const [dataVacancyNamesVerifications, setDataVacancyNamesVerifications] = useState<VerificationProps[]>([])
    const [dataCitiesVerifications, setDataCitiesVerifications] = useState<VerificationProps[]>([])
    const [dataSkillsVerifications, setDataSkillsVerifications] = useState<VerificationProps[]>([])
    useEffect(() => {
        const fetchSkillsVerifications = async () => {
            try {
                setIsLoading(true)
                const response = await fetch(GET_VERIFICATIONS_SKILLS, {
                    headers:{
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                })
                const data = await response.json();
                setDataSkillsVerifications(data)
            } catch (e) {
                throw new Error((e as Error).message)
            }
            setIsLoading(false)
        }
        const fetchCitiesVerifications = async () => {
            try {
                setIsLoading(true)
                const response = await fetch(GET_VERIFICATIONS_CITIES, {
                    headers:{
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                })
                const data = await response.json();
                setDataCitiesVerifications(data)
            } catch (e) {
                throw new Error((e as Error).message)
            }
            setIsLoading(false)
        }
        const fetchVacancyNamesVerifications = async () => {
            try {
                setIsLoading(true)
                const response = await fetch(GET_VERIFICATIONS_VACANCY_NAMES, {
                    headers:{
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                })
                const data = await response.json();
                setDataVacancyNamesVerifications(data)
            } catch (e) {
                throw new Error((e as Error).message)
            }
            setIsLoading(false)
        }
        void fetchSkillsVerifications();
        void fetchCitiesVerifications();
        void fetchVacancyNamesVerifications();
    },[])

    if(!user?.is_superuser){
        return notFound();
    }
    return (
        <div className={'flex flex-col items-center '}>
            <div className={'flex'}>
                <h1 className={'text-4xl flex-grow font-extrabold mt-4 p-2  rounded-2xl'}>Запросы на верификацию</h1>
            </div>
            <div className={'w-[1000px] space-y-4'}>
                <div className={'flex justify-center flex-col'}>
                    <h2 className={'text-3xl text-center font-light mt-4 p-2  rounded-2xl'}>Названия вакансий</h2>
                    <Separator className={'max-w-sm  self-center'} />
                    <Statistics verifyTableType={'name'} isVerification data={dataVacancyNamesVerifications}/>
                </div>
                <div className={'flex justify-center flex-col'}>
                    <h2 className={'text-3xl text-center font-light mt-4 p-2  rounded-2xl'}>Скиллы</h2>
                    <Separator className={'max-w-sm  self-center'} />
                    <Statistics  verifyTableType={'skill'} isVerification data={dataSkillsVerifications}/>
                </div>
                <div className={'flex justify-center flex-col'}>
                    <h2 className={'text-3xl text-center font-light mt-4 p-2  rounded-2xl'}>Города</h2>
                    <Separator className={'max-w-sm  self-center'} />
                    <Statistics verifyTableType={'city'} isVerification data={dataCitiesVerifications}/>
                </div>
            </div>
        </div>
    );
};

export default Page;