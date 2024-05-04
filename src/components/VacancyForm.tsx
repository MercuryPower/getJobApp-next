import React, {useState} from 'react';
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";

const VacancyForm = () => {

    const [workType, setWorkType] = useState('')
    const [jobExp, setjobExp] = useState('')
    const handleChange = (event: SelectChangeEvent) => {
        setWorkType(event.target.value);
        setjobExp(event.target.value);
    };
    return (
        <>
            <div className={'flex flex-col self-center w-1/2 m-4 mx-4 h-96 shadow border p-4'}>
                <div>
                    <h2 className={'font-bold text-center'}>Город</h2>

                </div>
                <div>
                    <h2 className={'font-bold text-center'}>Тип занятости</h2>
                    <div className={'flex justify-center'}>
                        <FormControl sx={{ m: 1, minWidth: 150 }}>
                            <InputLabel id="demo-simple-select-autowidth-label">Тип занятости</InputLabel>
                            <Select
                                labelId="demo-simple-select-autowidth-label"
                                id="demo-simple-select-autowidth"
                                value={workType}
                                onChange={handleChange}
                                autoWidth
                                label="Тип занятости"
                            >
                                <MenuItem value="">
                                    <em>Не указано</em>
                                </MenuItem>
                                <MenuItem value={'fullDay'}>Полный рабочий день</MenuItem>
                                <MenuItem value={'notFullDay'}>Неполный рабочий день</MenuItem>
                                <MenuItem value={'flexday'}>Гибкий график</MenuItem>
                                <MenuItem value={22}>Сменный график</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>
                <h2 className={'font-bold text-center'}>Уровень навыка</h2>
                    <div className={'flex justify-center'}>
                        <FormControl sx={{ m: 1, minWidth: 180 }}>
                            <Select
                                value={jobExp}
                                onChange={handleChange}
                                displayEmpty
                            >
                                <MenuItem value="">
                                    <em>Не указано</em>
                                </MenuItem>
                                <MenuItem value={1}>Intern</MenuItem>
                                <MenuItem value={2}>Junior</MenuItem>
                                <MenuItem value={3}>Middle</MenuItem>
                                <MenuItem value={4}>Senior</MenuItem>
                                <MenuItem value={5}>Lead</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>
            <div>

            </div>
        </>
    );
};

export default VacancyForm;