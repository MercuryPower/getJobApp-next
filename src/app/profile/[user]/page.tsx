'use client'
import React, {useEffect, useState} from 'react';
import {useParams, usePathname, useRouter} from "next/navigation";
import {useAuth} from "@/providers";
import {VacancyInfo} from "@/types/types";
import notFound from "@/app/not-found";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {Container} from "@mui/material";

const Page = () => {
    const pathname = usePathname();
    const {user, isLoggedIn} = useAuth()
    const params = useParams();
    const router = useRouter();
    if(!isLoggedIn){
        return notFound();
    }
    return (
        <div className={'flex justify-center max-w- self-center shadow p-4 m-2 my-6 rounded-2xl gap-5 border relative max-w-screen-lg w-full mx-auto'}>
            <Button onClick={() => router.back()} className={'absolute left-1 self-start mt-8 space-x-2 hover:no-underline hover:opacity-75 transition-all'} variant={'link'} type={'button'}>
                <svg  width="25" height="25" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M6.85355 3.85355C7.04882 3.65829 7.04882 3.34171 6.85355 3.14645C6.65829 2.95118 6.34171 2.95118 6.14645 3.14645L2.14645 7.14645C1.95118 7.34171 1.95118 7.65829 2.14645 7.85355L6.14645 11.8536C6.34171 12.0488 6.65829 12.0488 6.85355 11.8536C7.04882 11.6583 7.04882 11.3417 6.85355 11.1464L3.20711 7.5L6.85355 3.85355ZM12.8536 3.85355C13.0488 3.65829 13.0488 3.34171 12.8536 3.14645C12.6583 2.95118 12.3417 2.95118 12.1464 3.14645L8.14645 7.14645C7.95118 7.34171 7.95118 7.65829 8.14645 7.85355L12.1464 11.8536C12.3417 12.0488 12.6583 12.0488 12.8536 11.8536C13.0488 11.6583 13.0488 11.3417 12.8536 11.1464L9.20711 7.5L12.8536 3.85355Z"
                        fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                </svg>
                <h2 className={'text-xl'}>
                    Назад
                </h2>
            </Button>
            <div className={'p-2 flex flex-col  justify-center rounded'}>
            <div className={'flex justify-center space-x-4'}>
                <h1 className={'text-3xl self-center flex justify-center font-bold mt-4 p-2 rounded-2xl'}>Здравствуйте, {user?.username}!</h1>
                <Avatar  className={'self-center h-14 w-14'}>
                    <AvatarImage
                        src="https://cdn-icons-png.flaticon.com/512/8801/8801434.png"/>
                    <AvatarFallback>VC</AvatarFallback>
                </Avatar>
            </div>
            <div className={'flex flex-col self-center pl-32 pr-32 justify-center mt-12 space-y-4'}>
                <div className={'flex text-2xl '}>
                    <h2 className={'font-bold  min-w-[150px]'}>Email :</h2>
                    <h2>{user?.email} </h2>
                </div>
                <div className={'flex text-2xl'}>
                    <h2 className={'font-bold  min-w-[150px]'}>О вас: </h2>
                    <h2 className={'text-xl'}>{user?.description} </h2>
                </div>
            </div>
                <div className={'flex justify-items-center self-center mt-12 text-3xl'}>
                    <h2 className={'font-extralight '}>{user?.type === 'user' ? `Вы ищите работу` : `Вы ищите работника`} </h2>
                </div>
                <Button className={'flex w-96 h-16 justify-center text-xl  mt-4 self-center'}
                        onClick={() => router.replace(`${user?.type === 'company' ? `/vacancies` : `/jobseekers`}/me`)}>Мои Вакансии</Button>
            </div>
        </div>
    );
};

export default Page;