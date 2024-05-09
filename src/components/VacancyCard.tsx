import React from 'react';
import {Button} from "@/components/ui/Button";
import {VacancyInfo} from "@/app/vacancies/page";



const VacancyCard = ({data}: {data:VacancyInfo[]}) => {
    // const vacancyInfo:testVacancyInfo[] =[
    //     {
    //         id: 1,
    //         companyName: 'Company',
    //         vacancyName: 'Frontend developer / Фронтенд разработчик',
    //         exp:'Middle',
    //         skills:[
    //           'React',
    //           'TypeScript',
    //           'Redux'
    //         ],
    //         salary:'120000',
    //         tp:'Полнй день',
    //         cities:[
    //             {
    //                 city:'Москва',
    //             },
    //             {
    //                 city:'Саратов'
    //             }
    //
    //         ]
    //     },
    //     {
    //         id: 2,
    //         companyName: 'Company2',
    //         vacancyName: 'QA-engineer / QA-инженер',
    //         exp:'Senior',
    //         salary:'60000',
    //         tp:'Гибкий график',
    //         skills:[
    //             'C++',
    //             'Git',
    //         ],
    //         cities:[
    //             {
    //                 city:'Москва',
    //             },
    //             {
    //                 city:'Санкт-Петербург'
    //             }
    //
    //         ]
    //     },
    //     {
    //         id: 3,
    //         companyName: 'Company3',
    //         vacancyName: 'Java Developer',
    //         exp:'Senior',
    //         salary:'60000',
    //         tp:'Гибкий график',
    //         skills:[
    //             'C++',
    //             'Git',
    //         ],
    //         cities:[
    //             {
    //                 city:'Москва',
    //             },
    //             {
    //                 city:'Санкт-Петербург'
    //             }
    //
    //         ]
    //     },
    // ]
    return (
        <div className={'flex justify-center shadow-lg m-4 p-4 border rounded'}>
            <div className={'text-center'}>
                {data.map((vacancy) => {
                    return (
                        <div key={vacancy.id} className={'flex shadow p-4 m-2 my-6 rounded gap-5 border'}>
                            <div  className={'p-2 flex flex-col flex-grow rounded'} >
                                <div className={'flex text-center justify-center'}>
                                    <p className={'text-3xl font-bold  cursor-pointer'}>{vacancy.exp} {vacancy.vacancyName}</p>
                                </div>

                                <p className={'text-center text-2xl'}>от {vacancy.salary} &#8381; </p>
                                <p className={'font-light'}>{vacancy.companyName}</p>
                                <div className={'flex justify-center'}>
                                    {vacancy.skills?.map((skill, index) => {
                                        return <p key={index} className={'m-1 text-xl border font-bold hover:bg-gray-400 p-2 rounded-2xl'}>{skill}</p>
                                    })}
                                </div>
                                <p>Тип занятости: {vacancy.tp}</p>
                                <div className={'flex justify-center'}>
                                    {vacancy.cities?.map((city, index) =>{
                                        return <p className={'m-1 border  hover:bg-gray-500 p-2 rounded-2xl'} key={index}>{city.city}{index !== vacancy.cities.length}</p>
                                    })}
                                </div>
                            </div>
                            <div className={'flex self-center flex-col '}>
                                <Button size={'lg'}>Откликнутся</Button>
                            </div>
                        </div>


                    )
                })}
            </div>
        </div>
    );
};

export default VacancyCard;