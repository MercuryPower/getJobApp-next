'use client'
import React, {useState} from 'react';
import {FormControl, InputLabel, ListSubheader, MenuItem, Select, SelectChangeEvent, TextField} from "@mui/material";
import VacancyStep1 from "@/components/VacancyStep1";
import VacancyStep2 from "@/components/VacancyStep2";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";

const VacancyForm = () => {
    const router = useRouter();
    // const initialValues = {
    //     company: "",
    //     position: "",
    //     link: "",
    //     date: "",
    //     workType: "",
    // };
    // const [values, setValues] = useState(initialValues);
    //
    // const handleInputChange = (event: SelectChangeEvent<string>) => {
    //     const { name, value } = event.target;
    //     setValues({
    //         ...values,
    //         [name]: value,
    //     });
    // };
    // const handleContinue = () => {
    //     if (step < 3){
    //         setStep(step + 1)
    //     }
    // }
    // const [step, setStep] = useState(1)
    return (
        <form className={'flex flex-grow flex-col self-center min-w-4 w-1/2  m-6 shadow rounded border p-4'}>
            <div  className={'flex flex-col justify-center text-2xl font-bold'}>
                    <Button size={'lg'}  type={'button'} onClick={() => router.push('/vacancies/create')} className={'transition-all shadow p-6 h-16 rounded bg-green-600 '}>Создать вакансию</Button>
            </div>
            {/*    <div className={'flex justify-center'}>*/}
            {/*        <VacancyStep1 />*/}
            {/*    </div>*/}

            {/*    <div>*/}
            {/*        <h2 className={'font-bold text-center'}>Город</h2>*/}
            {/*    </div>*/}
            {/*    <div className={'flex  flex-col justify-center'}>*/}
            {/*        <h2 className={'font-bold text-center'}>Тип занятости</h2>*/}
            {/*            <FormControl sx={{ m: 1 }} className={'dark:invert rounded w-48 self-center'}>*/}
            {/*                <InputLabel id="demo-simple-select-autowidth-label">Тип занятости</InputLabel>*/}
            {/*                <Select*/}
            {/*                    labelId="demo-simple-select-autowidth-label"*/}
            {/*                    id="demo-simple-select-autowidth"*/}
            {/*                    value={values.workType}*/}
            {/*                    onChange={handleInputChange}*/}
            {/*                    name={'workType'}*/}
            {/*                    autoWidth*/}
            {/*                    label="Тип занятости"*/}
            {/*                >*/}
            {/*                    <NavbarItem value="">*/}
            {/*                        <em>Не указано</em>*/}
            {/*                    </NavbarItem>*/}
            {/*                    <NavbarItem value={'fullDay'}>Полный рабочий день</NavbarItem>*/}
            {/*                    <NavbarItem value={'notFullDay'}>Неполный рабочий день</NavbarItem>*/}
            {/*                    <NavbarItem value={'flexday'}>Гибкий график</NavbarItem>*/}
            {/*                    <NavbarItem value={22}>Сменный график</NavbarItem>*/}
            {/*                </Select>*/}
            {/*            </FormControl>*/}
            {/*    </div>*/}
            {/*    <h2 className={'font-bold text-center'}>Укажите уровень навыка</h2>*/}
            {/*    <div className={'flex justify-center'}>*/}
            {/*        <FormControl sx={{ m: 1}} className={'dark:invert rounded m-2 w-40'}>*/}
            {/*            <InputLabel id="demo-simple-select-autowidth-label">Уровень опыта</InputLabel>*/}
            {/*            <Select*/}
            {/*                onChange={handleInputChange}*/}
            {/*                autoWidth*/}
            {/*                name={'workType'}*/}
            {/*                label="Уровень опыта"*/}
            {/*            >*/}
            {/*                <NavbarItem value="">*/}
            {/*                    <em>Не указано</em>*/}
            {/*                </NavbarItem>*/}
            {/*                <NavbarItem value={1}>Intern</NavbarItem>*/}
            {/*                <NavbarItem value={2}>Junior</NavbarItem>*/}
            {/*                <NavbarItem value={3}>Middle</NavbarItem>*/}
            {/*                <NavbarItem value={4}>Senior</NavbarItem>*/}
            {/*                <NavbarItem value={5}>Lead</NavbarItem>*/}
            {/*            </Select>*/}
            {/*        </FormControl>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </form>
    );
};

export default VacancyForm;