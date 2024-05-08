import React from 'react';
import {Button} from "@/components/ui/Button";


export interface testVacancyInfo {
    id: number;
    companyName: string;
    vacancyName:string;
    salary?: string;
    tp?:string;
    cities:{
        city:string
    }[]

}
const VacancyCard = () => {
    const vacancyInfo:testVacancyInfo =
        {
            id: 1,
            companyName: 'Company',
            vacancyName: 'Frontend developer / Фронтенд разработик',
            salary:'40000',
            tp:'Полнй день',
            cities:[
                {
                    city:'Москва',
                },
                {
                    city:'Саратов'
                }

            ]
        }
    return (
        <div className={'flex justify-center shadow-lg   m-8 p-4 border rounded'}>
            <div className={'w-9/12 text-center'}>
                <p className={'text-3xl font-bold  cursor-pointer'}>{vacancyInfo.vacancyName}</p>
                <p className={'text-center text-2xl'}>от {vacancyInfo.salary} &#8381; </p>
                <p className={'font-light'}>{vacancyInfo.companyName}</p>
                <p>Тип занятости: {vacancyInfo.tp}</p>
                <div className={'flex justify-center'}>
                    {vacancyInfo.cities.map((city, index) =>{
                        return <p className={'m-1 border  hover:bg-gray-500 p-2 rounded-2xl'} key={index}>{city.city}{index !== vacancyInfo.cities.length}</p>
                    })}
                </div>

            </div>

            <div className={'flex self-center'}>
                <Button>Откликнутся</Button>
            </div>
        </div>
    );
};

export default VacancyCard;