'use client'
import React, {useState} from 'react';
import {ComboboxCity} from "@/components/filter/ComboboxCities";
import SelectTypeOfEmploy from "@/components/filter/SelectTypeOfEmploy";
import MultiselectSkills from "@/components/filter/MultiselectSkills";
import SalarySlider from "@/components/filter/SalarySlider";
import {Button} from "@/components/ui/button";
import {usePathname, useRouter} from "next/navigation";
import MultiselectProfessions from "@/components/filter/MultiselectProfessions";

const VacancyFilter = ({ onQueryChange, query }: { onQueryChange: (query: string) => void , query: string}) => {
    const pathname = usePathname();
    const [selectedCity, setSelectedCity] = useState<string>("");
    const [selectedTypeOfEmploy, setSelectedTypeOfEmploy] = useState<string[]>([]);
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
    const [minSalary, setMinSalary] = useState<number>(0);
    const [maxSalary, setMaxSalary] = useState<number>(500000);
    const router = useRouter();
    const [selectedProfessions, setSelectedProfessions] = useState<string[]>([]);
    const onSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const queryParams = new URLSearchParams();

        if (selectedCity) {
            queryParams.set('city', selectedCity);
        }
        if (selectedTypeOfEmploy.length > 0) {
            queryParams.set('typeOfEmploy', selectedTypeOfEmploy.join(','));
        }
        if (selectedSkills.length > 0) {
            queryParams.set('skills', selectedSkills.join(','));
        }
        if (minSalary !== 0) {
            queryParams.set('minSalary', minSalary.toString());
        }
        if(maxSalary < 500000)
        {
            queryParams.set('maxSalary', maxSalary.toString());
        }
        if (selectedProfessions.length > 0) {
            queryParams.set('profession', selectedProfessions.join(','));
        }

        const queryString = queryParams.toString();
        const fullPath = `${pathname}?${queryString}${query &&`&query=${query}`}`;
        console.log(fullPath)

        onQueryChange(queryString);

        router.push(fullPath);

        // try {
        //     const response = await fetch(`http://127.0.0.1:8000/tests/company?${queryString}`, {
        //         method: 'GET',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //     });
        //
        //     if (response.ok) {
        //         const data = await response.json();
        //         console.log(data);
        //     } else {
        //         console.error('Failed to fetch vacancies');
        //     }
        // } catch (error:any) {
        //     throw new Error((error as Error).message)
        // }
    };

    const handleMinSalaryChange = (minSalary:number) => {
        setMinSalary(minSalary)
    }
    const handleMaxSalaryChange = (maxSalary:number) => {
        setMaxSalary(maxSalary)
    }

    return (
        <div className={'flex flex-col justify-items-center shadow-lg m-4 p-4 border text-center  rounded-2xl space-y-2 w-72 h-fit '}>
            <h2 className={'font-bold text-xl'}>Фильтр</h2>
            <div>
                <form onSubmit={onSubmit}>
                    <div className={'space-y-4 pt-6'}>
                        <div className={'space-y-2'}>
                            <h3 className={'text-lg'}>Город</h3>
                            <ComboboxCity setSelectedCity={(selectedCity) => setSelectedCity(selectedCity)}/>
                        </div>
                        <div className={'space-y-2'}>
                            <h3 className={'text-lg'}>Тип занятости</h3>
                            {!selectedTypeOfEmploy ?
                                <div>
                                    <span
                                        className={'m-4 text-xs max-h-20 p-2 border text-start '}>Данных не найдено</span>
                                </div>
                                :
                                <SelectTypeOfEmploy
                                    onChecked={(selectedEmploymentType) => setSelectedTypeOfEmploy(selectedEmploymentType)}/>
                            }

                        </div>
                        <div className={'space-y-2'}>
                            <h3 className={'text-lg'}>Навыки</h3>
                            <MultiselectSkills onChange={(skills) => setSelectedSkills(skills)}/>
                        </div>
                        <div className={'space-y-2'}>
                            <h3 className={'text-lg'}>Профессии</h3>
                            <MultiselectProfessions onChange={(professions) => setSelectedProfessions(professions)}/>
                        </div>
                        <div className={'space-y-2'}>
                            <h3 className={'text-lg'}>Желаемая зарплата</h3>
                            <SalarySlider onChangeMinSalary={handleMinSalaryChange}
                                          onChangeMaxSalary={handleMaxSalaryChange}/>
                        </div>
                    </div>
                    <Button type={'submit'} className={'mt-8'}>Поиск</Button>
                </form>
            </div>
        </div>
    );
};

export default VacancyFilter;