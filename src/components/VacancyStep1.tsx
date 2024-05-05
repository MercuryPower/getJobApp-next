import React, {useState} from 'react';
import {FormControl, InputLabel, ListSubheader, MenuItem, Select, TextField} from "@mui/material";
import Image from "next/image";

const VacancyStep1 = () => {

    const [jobCategory, setJobCategory] = useState('IT')
    return (
        <div className={'flex justify-center'}>
            <div className={'flex flex-col justify-center '}>
                <h2 className={'font-bold text-center'}>Название вакансии</h2>
                    <TextField placeholder={'Например: Frontend'} className={'w-96 dark:invert'}/>
                <p className={'text-center font-light'}>Или</p>
                <h2 className={'font-bold text-center'}>Выберите категорию</h2>
                <button className={'flex flex-col justify-center self-center w-80 h-32 shadow  border '}>
                    <Image src={'/technology.svg'} className={'self-center opacity-75 dark:invert'} width={42} height={42} alt={'it-category'} />
                    <h1 className={'text-3xl self-center'}>{jobCategory}</h1>
                </button>
            </div>
        </div>

    );
};

export default VacancyStep1;