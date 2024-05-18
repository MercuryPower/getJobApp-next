'use client'
import React, {useState} from 'react';
import {Form} from "@/components/ui/form";
import {ComboboxCity} from "@/components/filter/ComboboxCities";
import SelectTypeOfEmploy from "@/components/filter/SelectTypeOfEmploy";
import MultiselectSkills from "@/components/filter/MultiselectSkills";
import SalarySlider from "@/components/filter/SalarySlider";
import {Button} from "@/components/ui/button";
import {LoginSchema, RegistrationSchema} from "@/schemas";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {register} from "@/actions/registration";
import {login} from "@/actions/login";
import {tryParsePattern} from "next/dist/build/webpack/plugins/jsconfig-paths-plugin";
import {usePathname, useRouter} from "next/navigation";

const VacancyFilter = () => {
    const pathname = usePathname();

    const [selectedCity, setSelectedCity] = useState<string>("");
    const [selectedTypeOfEmploy, setSelectedTypeOfEmploy] = useState<string[]>([]);
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
    const [selectedSalaryRange, setSelectedSalaryRange] = useState<number[]>([]);
    const router = useRouter();
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
        if (selectedSalaryRange.length > 0) {
            queryParams.set('salary', selectedSalaryRange.join(','));
        }

        const queryString = queryParams.toString();
        const fullPath = `${pathname}?${queryString}`;

        router.push(fullPath);

        try {
            const response = await fetch(`/vacancies?${queryString}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
            } else {
                console.error('Failed to fetch vacancies');
            }
        } catch (error) {
            console.error('Error fetching vacancies:', error);
        }
    };
    return (
        <div className={'flex flex-col justify-items-center shadow-lg m-4 p-4 border text-center  rounded-2xl space-y-2 w-72 h-fit '}>
            <h2 className={'font-bold text-xl'}>Фильтр</h2>
            <div>
                <form onSubmit={onSubmit}>
                    <div className={'space-y-4 pt-6'}>
                        <div className={'space-y-2'}>
                            <h3 className={'text-lg'}>Город</h3>
                            <ComboboxCity onSelect={(selectedCity) => setSelectedCity(selectedCity)} />
                        </div>
                        <div className={'space-y-2' }>
                            <h3 className={'text-lg'}>Тип занятости</h3>
                            <SelectTypeOfEmploy onChecked={(selectedEmploymentType) => setSelectedTypeOfEmploy(selectedEmploymentType)} />
                        </div>
                        <div className={'space-y-2'}>
                            <h3 className={'text-lg'}>Навыки</h3>
                            <MultiselectSkills  onChange={(skills) => setSelectedSkills(skills)}  />
                        </div>
                        <div className={'space-y-2'}>
                            <h3 className={'text-lg'}>Желаемая зарплата</h3>
                            <SalarySlider  />
                        </div>
                    </div>
                    <Button type={'submit'} className={'m-2'}>Поиск</Button>
                </form>
            </div>
        </div>
    );
};

export default VacancyFilter;