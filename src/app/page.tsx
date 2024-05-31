'use client'
import Link from "next/link";
import Navbar from "@/components/Navbar";
import AnimatedNumbers from "react-animated-numbers";
import Image from "next/image";
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import SearchMainSection from "@/components/sections/SearchMainSection";
import VacancyForm from "@/components/forms/VacancyForm";
import KeyFeaturesSection from "@/components/sections/KeyFeaturesSection";
import {auth} from "@/auth";
import LoginSection from "@/components/sections/LoginSection";
import {useRouter} from "next/navigation";
import React, {useEffect, useState} from "react";
import {useAuth, useIsEmployer} from "@/components/providers";
import JobSeekerForm from "@/components/forms/JobSeekerForm";
import {Statistics} from "@/components/tables/Statistics";
import RecommendationSection from "@/components/sections/RecommendationSection";
import {StatisticProps} from "@/types/types";
import {RESUME_STATISTIC, VACANCY_STATISTIC} from "@/url/urls";
export default function Home() {
    const {isEmployer} = useIsEmployer()
    const [dataVacancyStatistics, setDataVacancyStatistics] = useState<StatisticProps[]>([])
    useEffect(() => {

        const fetchStatisticVacancy = async () => {
            try {
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
    const { isLoggedIn, user } = useAuth();
    // const [isLoggedIn, setIsLoggedIn] = useState(false)
    // const [user, setUser] = useState<any>()
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const user_response = await fetch('http://127.0.0.1:8000/users/me', {
    //                 method: 'GET',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     'Authorization': `Bearer ${localStorage.getItem('token')}`
    //                 },
    //                 next:{revalidate:3600}
    //             });
    //             const responseData = await user_response.json();
    //
    //             // Проверка успешности аутентификации
    //             if (user_response.ok) {
    //                 setIsLoggedIn(true);
    //                 setUser(responseData); // Предположим, что имя пользователя находится в свойстве "name" объекта responseData
    //             } else {
    //                 setIsLoggedIn(false);
    //                 setUser(null);
    //             }
    //         } catch (error) {
    //             setIsLoggedIn(false);
    //             setUser(null);
    //             throw new Error((error as Error).message);
    //         }
    //     };
    //     fetchData();
    //     return () => {
    //     };
    // }, []);

    return (
        <main>
            <SearchMainSection/>
            <KeyFeaturesSection/>
            <section>
                <div className={'flex flex-col m-24 p-2 '}>
                    {isLoggedIn ?
                        user?.type === 'company' ?
                            <h1 className={'text-4xl font-light'}>| 01 <span className={' p-2 font-bold text-3xl '}>Создайте необходимую вакансию</span>
                            </h1>
                            :
                            <h1 className={'text-4xl font-light'}>| 01 <span className={' p-2 font-bold text-3xl '}>Создайте необходимое резюме</span>
                            </h1>
                    :
                        <h1 className={'text-4xl font-light'}>| 01 <span className={' p-2 font-bold text-3xl '}>Создайте вакансию или резюме </span>
                        </h1>
                    }

                    {isLoggedIn ?
                        user?.type === 'company' ? (
                                <VacancyForm/>
                            ) :
                            (
                                <JobSeekerForm/>
                            )
                        :
                        <div
                            className={'flex rounded-2xl h-96 justify-center flex-grow flex-col self-center min-w-4 w-1/2  m-6 shadow border p-4 space-y-4'}>
                            <span className={'self-center '}>Чтобы создать вакансию/резюме - авторизуйтесь</span>
                            <LoginSection/>
                        </div>
                    }
                </div>
                <div className={'flex m-24 p-2 flex-col'}>
                    <h1 className={'text-4xl font-light'}>| 02 <span className={'p-2 font-bold text-3xl '}>Посмотрите рекомендации для вас</span>
                    </h1>
                    <div className={'flex justify-center mt-4 h-auto overflow-hidden'}>
                        <RecommendationSection />
                    </div>
                </div>
                <div className={'flex m-24 p-2 flex-col  '}>
                    <h1 className={'text-4xl font-light'}>| 03 <span
                        className={'p-2 font-bold text-3xl '}>Почти готово!</span> <span
                        className={'text-xl text-center'}>Вы можете посмотреть статистику о востребованности профессии внизу.</span>
                    </h1>
                    <div className={'flex justify-center mt-4 h-auto'}>
                        {isEmployer ?
                            <Statistics data={dataVacancyStatistics}/>
                            :
                            <Statistics data={dataVacancyStatistics}/>
                        }

                    </div>
                </div>
            </section>
        </main>
    );
}
