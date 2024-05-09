'use client'
import React, {useState} from 'react';
import VacancyCard from "@/components/VacancyCard";

const Page = () => {
    const [vacancy, setVacancy] = useState()
    return (
        <>
            <div className={'flex flex-col items-center justify-center m-12'}>
                <div className={'flex self-center m-4 mt-7 h-14 rounded'}>
                    <input className={'w-96 flex p-2 text-xl rounded-l '}></input>
                    <button className={'flex text-white bg-green-600 p-4 gap-1 rounded-r-lg self-center font-bold hover:opacity-70 transition'}>
                        Найти
                    </button>
                </div>
                <div className={'h-dvh rounded m-4'}>
                    <VacancyCard />
                </div>
            </div>
        </>
    );
};

export default Page;