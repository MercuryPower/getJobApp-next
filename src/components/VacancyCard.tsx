import React from 'react';
import {Button} from "@/components/ui/button";
import {VacancyInfo} from "@/app/vacancies/page";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import {Card, CardContent} from "@/components/ui/card";



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
        <div className={'flex  justify-center shadow-lg m-4 p-4 border rounded '}>
            <div className={'text-center '}>
                {data.map((vacancy) => {
                    return (
                        <div key={vacancy.id} className={'flex shadow p-4 m-2 my-6 rounded  gap-5 border'}>
                            <div  className={'p-2 max-w-lg flex flex-col flex-grow rounded'} >
                                <div className={' flex text-center justify-center'}>
                                    <p className={'text-3xl text-ellipsis overflow-hidden font-bold  cursor-pointer'}>{vacancy.exp} {vacancy.vacancyName}</p>
                                </div>
                                <p className={'text-center text-2xl text-ellipsis overflow-hidden '}>от {vacancy.salary} &#8381; </p>
                                <p className={'font-light text-ellipsis overflow-hidden'}>{vacancy.companyName}</p>
                                <div className={'flex justify-center'}>
                                    {vacancy.skills.map((skill, index) => {
                                        return <p key={skill.id} className={'text-ellipsis overflow-hidden m-1 text-xl border font-bold hover:bg-gray-400 p-2 rounded-2xl'}>{skill.skill}</p>
                                    })}
                                </div>
                                <p>Тип занятости: {vacancy.tp}</p>
                                {/*<p key={city.id} className={'m-1 border  hover:bg-gray-500 p-2 rounded-2xl'}>{city.city}</p>*/}
                                <div className={'flex justify-center w-full overflow-x-auto '}>
                                    <Carousel opts={{align:'center',dragFree: true}} className="w-full max-w-xs  ">
                                        <CarouselContent className={'-ml-4'}>
                                            {vacancy.cities.map((city) => (
                                                <CarouselItem className="basis-1/${city.length} hover:opacity-75 pl-4" key={city.id}>
                                                    <div className="p-1">
                                                        <Card>
                                                            <CardContent className="m-1  p-2 rounded-2xl">
                                                                <span className=" font-semibold">{city.city}</span>
                                                            </CardContent>
                                                        </Card>
                                                    </div>
                                                </CarouselItem>
                                            ))}
                                        </CarouselContent>
                                    </Carousel>
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