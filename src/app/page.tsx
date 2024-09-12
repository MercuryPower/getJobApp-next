'use client'
import SearchMainSection from "@/components/sections/SearchMainSection";
import VacancyForm from "@/components/forms/VacancyForm";
import KeyFeaturesSection from "@/components/sections/KeyFeaturesSection";
import LoginSection from "@/components/sections/LoginSection";
import React, {useEffect, useState} from "react";
import {useAuth, useIsEmployer} from "@/providers";
import JobSeekerForm from "@/components/forms/JobSeekerForm";
import {Statistics} from "@/components/tables/Statistics";
import RecommendationSection from "@/components/sections/RecommendationSection";
import {RESUME_STATISTIC, VACANCY_STATISTIC} from "@/url/urls";
import TypeChanger from "@/entities/TypeChanger/TypeChanger";
import {StatisticProps} from "@/types/types";
import {FileQuestion, Lightbulb, LogIn} from "lucide-react";
import StatisticTips from "@/components/tips/StatisticTips";
import Scene from "@/entities/Scene/scene";
export default function Page() {
    const [offTips, setOffTips] = useState(true);
    const {isEmployer} = useIsEmployer()
    const [fadeOut, setFadeOut] = useState(false);
    const [dataVacancyStatistics, setDataVacancyStatistics] = useState<StatisticProps[]>([])
    useEffect(() => {
        const fetchStatisticVacancy = async () => {
            try {
                const response = await fetch(`${isEmployer ? `${VACANCY_STATISTIC}`: `${RESUME_STATISTIC}`}`,{
                    cache:'force-cache',
                    next:{revalidate:600}
                })
                const data = await response.json();
                setDataVacancyStatistics(data)
            } catch (e) {
                throw new Error((e as Error).message)
            }
        }
        void fetchStatisticVacancy()
    },[isEmployer])
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
    const handleSetOffTips = () => {
        setFadeOut(true);
        setTimeout(() => {
            setOffTips(false);
        }, 750);
    };
    return (
        <main>
            {/*<div className={'absolute w-full h-96  top-20 bottom-0'}>*/}
            {/*    <Scene />*/}
            {/*</div>*/}
            <SearchMainSection/>
            <KeyFeaturesSection/>
            <section>
                <div className={'flex flex-col m-24 p-2 '}>
                    {isLoggedIn ?
                        user?.type === 'company' ?
                            <h1 className={'text-4xl font-light'}>| 01 <span className={' p-2 font-bold text-3xl '}>Создайте вакансию</span>
                            </h1>
                            :
                            <h1 className={'text-4xl font-light'}>| 01 <span className={' p-2 font-bold text-3xl '}>Создайте резюме</span>
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
                            className={'flex text-center self-center space-y-4 flex-col shadow-lg m-4 p-4 border rounded-2xl w-full h-96 justify-center'}>
                            <div className={'flex justify-center self-center p-2 bg-green-600 shadow-lg rounded-full'}>
                                <LogIn className={'self-center dark:invert '} color={'white'} size={64}/>
                            </div>
                            <span className={'self-center text-3xl font-extrabold text-center '}>Чтобы создать  вакансию/резюме <br/> необходимо  войти в аккаунт.</span>
                            <LoginSection/>
                        </div>
                    }
                </div>
                <div className={'flex m-24 p-2 flex-col'}>
                    <h1 className={'text-4xl font-light'}>| 02 <span className={'p-2 font-bold text-3xl '}>Посмотрите рекомендации для вас</span>
                    </h1>
                    <div className={'flex justify-center mt-4 h-auto overflow-hidden'}>
                        {isLoggedIn ?
                            <RecommendationSection />
                            :
                            <div
                                className={'flex text-center self-center gap-2 flex-col shadow-lg m-4 p-4 border rounded-2xl w-full m h-96 justify-center'}>
                                <div className={'flex justify-center self-center p-2 bg-green-600 shadow-lg rounded-full'}>
                                    <Lightbulb className={'self-center dark:invert '} color={'white'} size={64}/>
                                </div>
                                <span className={'self-center text-3xl font-extrabold '}>Чтобы увидеть рекомендации необходимо <br/> войти в аккаунт.</span>
                                <div className={'flex  justify-center mt-2'}>
                                    <LoginSection />
                                </div>
                            </div>
                        }


                    </div>
                </div>
                <div className={'flex m-24 p-2 flex-col  '}>
                    <h1 className={'text-4xl font-light'}>| 03 <span
                        className={'p-2 font-bold text-3xl '}>Почти готово!</span> <span
                        className={'text-xl text-center'}>Вы можете посмотреть статистику о востребованности профессии внизу.</span>
                    </h1>
                    {
                        dataVacancyStatistics.length !== 0 ?
                            <div className={'flex justify-center mt-4 h-auto gap-x-4'}>
                                <div className={'flex-grow justify-center flex w-[300px]'}>
                                    <div className={'flex relative'}>
                                        {offTips &&
                                            <StatisticTips fadeOut={fadeOut}/>
                                        }
                                        <TypeChanger inMainPage setOffTips={handleSetOffTips}/>
                                    </div>
                                </div>
                                <Statistics data={dataVacancyStatistics} isEmployer={isEmployer}/>
                            </div>
                        :
                            <div
                                className={'flex text-center self-center gap-2 flex-col shadow-lg m-4 p-4 border rounded-2xl w-full m h-96 justify-center'}>
                                <FileQuestion className={'self-center'} size={64}/>
                                <span className={'self-center text-3xl font-extrabold '}>Данных о статистике не найдено.</span>
                                <div className={'mt-2'}>
                                    <p className={'text-md opacity-75'}> Попробуйте обновить страницу</p>
                                    <p className={'text-lg opacity-75 font-bold'}>или</p>
                                    <p className={'text-md opacity-75'}>зайдите немного позже.</p>
                                </div>
                            </div>
                        }

                </div>
            </section>
        </main>
    );
}