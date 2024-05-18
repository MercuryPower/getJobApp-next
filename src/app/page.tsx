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
import {useEffect, useState} from "react";
import {useAuth} from "@/components/providers";
import JobSeekerForm from "@/components/forms/JobSeekerForm";
export default function Home() {
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
                    <h1 className={'text-4xl font-light'}>| 01 <span className={' p-2 font-bold text-3xl '}>Создайте необходимую вакансию</span>
                    </h1>
                    {isLoggedIn  ?
                        user?.type === 'company' ?(
                            <VacancyForm/>
                            ):
                            (
                            <JobSeekerForm/>
                            )
                            :
                        <div className={'flex h-96 justify-center flex-grow flex-col self-center min-w-4 w-1/2  m-6 shadow rounded border p-4 space-y-4'}>
                            <span className={'self-center '}>Чтобы создать вакансию - авторизуйтесь</span>
                            <LoginSection />
                        </div>
                    }
                </div>
                <div className={'flex m-24 p-2 '}>
                    <h1 className={'text-4xl font-light'}>| 02 <span className={'p-2 font-bold text-3xl '}>Посмотрите рекомендации для вас</span>
                    </h1>
                </div>
                <div className={'flex m-24 p-2 '}>
                    <h1 className={'text-4xl font-light'}>| 03 <span
                        className={'p-2 font-bold text-3xl '}>Почти готово!</span> <span
                        className={'text-xl text-center'}>Вы можете посмотреть статистику о востребованности профессии внизу.</span>
                    </h1>
                </div>
            </section>
        </main>
    );
}
