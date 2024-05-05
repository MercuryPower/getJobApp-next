'use client'
import React, {useState} from 'react';
import {FormControl, InputLabel, ListSubheader, MenuItem, Select, SelectChangeEvent, TextField} from "@mui/material";
import VacancyStep1 from "@/components/VacancyStep1";

const VacancyForm = () => {
    const initialValues = {
        company: "",
        position: "",
        link: "",
        date: "",
        workType: "",
    };
    const [values, setValues] = useState(initialValues);

    const handleInputChange = (event: SelectChangeEvent<string>) => {
        const { name, value } = event.target;
        setValues({
            ...values,
            [name]: value,
        });
    };
    const [step, setStep] = useState(1)
    return (
        <form className={'flex  flex-col self-center w-1/2 m-6 h-auto shadow rounded border p-4'}>
            <div  className={'flex flex-col justify-center text-2xl font-bold'}>
                <div className={'flex justify-center'}>
                    Этап {step}
                </div>
                {step === 1 && <VacancyStep1 />}
                <div className={'flex justify-center m-4 '}>
                    <button type={'submit '} className={'shadow p-4 rounded bg-green-600 hover:opacity-75'}>Продолжить</button>
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
            {/*                    <MenuItem value="">*/}
            {/*                        <em>Не указано</em>*/}
            {/*                    </MenuItem>*/}
            {/*                    <MenuItem value={'fullDay'}>Полный рабочий день</MenuItem>*/}
            {/*                    <MenuItem value={'notFullDay'}>Неполный рабочий день</MenuItem>*/}
            {/*                    <MenuItem value={'flexday'}>Гибкий график</MenuItem>*/}
            {/*                    <MenuItem value={22}>Сменный график</MenuItem>*/}
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
            {/*                <MenuItem value="">*/}
            {/*                    <em>Не указано</em>*/}
            {/*                </MenuItem>*/}
            {/*                <MenuItem value={1}>Intern</MenuItem>*/}
            {/*                <MenuItem value={2}>Junior</MenuItem>*/}
            {/*                <MenuItem value={3}>Middle</MenuItem>*/}
            {/*                <MenuItem value={4}>Senior</MenuItem>*/}
            {/*                <MenuItem value={5}>Lead</MenuItem>*/}
            {/*            </Select>*/}
            {/*        </FormControl>*/}
            {/*    </div>*/}
            </div>
        </form>
    );
};

export default VacancyForm;