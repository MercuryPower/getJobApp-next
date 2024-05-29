import React from 'react';
import {Statistics} from "@/components/tables/Statistics";

const Page = () => {
    return (
        <div className={'flex flex-col items-center '}>
            <h1 className={'text-3xl font-extrabold mt-4 p-2  rounded-2xl'}>Статистика</h1>
            <div className={'w-[900px]'}>
                <Statistics />
            </div>

        </div>
    );
};

export default Page;