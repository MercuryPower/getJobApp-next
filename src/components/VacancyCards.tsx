
import React, {useEffect, useState} from 'react';
import {Button} from "@/components/ui/button";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import {Card, CardContent} from "@/components/ui/card";
import {VacancyInfo} from "@/types/types";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import VacancyCardSkeleton from "@/components/ui/skeletons/VacancyCardSkeleton";
import {CircleX} from "lucide-react";
import {usePathname, useRouter} from "next/navigation";
import Link from "next/link";



const VacancyCards = ({data, page, query, queryString}: {data:VacancyInfo[], page:number, query:string, queryString:string}) => {
    const pathname = usePathname()
    const router = useRouter();
    const [filteredVacancies, setFilteredVacancies] = useState<VacancyInfo[]>(data)
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`http://127.0.0.1:8000/tests/company?page=${page}&query=${query}&${queryString}`);
                const responseData = await response.json();
                setFilteredVacancies(responseData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        void fetchData();
    }, [page, query, queryString]);
    // useEffect(() => {
    //     if (data && data.length > 0 && query && query.trim() !== '') {
    //         const filteredData = data.filter((vacancy) => {
    //             const keywords = query.split(' ').filter(Boolean); // Разбить запрос на отдельные слова и удалить пустые строки
    //             const vacancyFields = Object.values(vacancy).join(' ').toLowerCase();
    //             return keywords.some(keyword => vacancyFields.includes(keyword.toLowerCase()));
    //         });
    //         setFilteredVacancies(filteredData);
    //     } else {
    //         setFilteredVacancies(data);
    //     }
    // }, [data, query]);

    return (
        <>
        {isLoading ? <VacancyCardSkeleton /> : (
            <div className={'text-center '}>
                {filteredVacancies.length > 0 ? filteredVacancies.map((vacancy) => {
                return (
                <div key={vacancy.id} className={'flex shadow p-4 m-2 my-6 rounded-2xl  gap-5 border'}>
                    <div className={'p-2  w-[500px] flex flex-col flex-grow rounded'}>
                        <div className={' flex text-center justify-center p-2'}>
                            <Link href={`${pathname}/${vacancy.id}`}>
                                <p className={'text-3xl text-ellipsis overflow-hidden font-bold  cursor-pointer'}>{vacancy.exp} {vacancy.vacancy_name}</p>
                            </Link>
                        </div>
                        {vacancy.salary_type === 'range' ?
                            <p className={'text-center text-2xl font-light text-ellipsis overflow-hidden '}>{vacancy.min_salary} - {vacancy.max_salary} &#8381; </p>

                            :
                            vacancy.salary_type === 'fixed' ? (
                            <p className={'text-center text-2xl font-light text-ellipsis overflow-hidden '}>{vacancy.fixed_salary} &#8381;</p>
                                ): (
                                <p className={'text-center text-2xl  font-lighttext-ellipsis overflow-hidden '}>по договоренности </p>
                            )
                        }
                        <div className={'flex justify-center p-2'}>
                            <Avatar>
                                <AvatarImage
                                    src="https://acdn.tinkoff.ru/static/pages/files/d39e9d26-fd5e-4574-9ad3-c3f2fc102598.png"/>
                                <AvatarFallback>VC</AvatarFallback>
                            </Avatar>
                            <p className={'text-ellipsis overflow-hidden'}>
                                <HoverCard>
                                    <HoverCardTrigger asChild>
                                        <Button variant="link">{'vacancy.companyName'}</Button>
                                    </HoverCardTrigger>
                                    <HoverCardContent className="w-fit ">
                                        <div className="flex justify-between space-x-4 self-center " >
                                            <Avatar className={'self-center'}>
                                                <AvatarImage
                                                    src="https://acdn.tinkoff.ru/static/pages/files/d39e9d26-fd5e-4574-9ad3-c3f2fc102598.png"/>
                                                <AvatarFallback>VC</AvatarFallback>
                                            </Avatar>
                                            <div className="space-y-2 flex max-w-md flex-col  justify-center self-center ">
                                                <h4 className="text-sm text-ellipsis overflow-hidden font-semibold">{"vacancy.companyName"}</h4>
                                                <p className="text-sm max-w-32 text-ellipsis overflow-hidden">
                                                    {`vacancy.descriptionaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`}
                                                </p>
                                                <div className="flex flex-col  items-center text-ellipsis  overflow-hidden pt-2">
                                                    <span
                                                        className="text-xs text-muted-foreground ">Joined December 2021</span>
                                                </div>
                                            </div>
                                        </div>
                                    </HoverCardContent>
                                </HoverCard>
                            </p>
                        </div>
                        {vacancy.skills && vacancy.skills?.length > 0 && (
                            <div className={'flex justify-center m-2'}>
                                <Carousel opts={{align: 'start', dragFree: true}} className="w- max-w-md   ">
                                    <CarouselContent className={'-ml-4'}>
                                        {vacancy.skills?.map((skill) => (
                                            <CarouselItem
                                                className={`basis-${vacancy.skills.length === 1 ? 'full' : (vacancy.skills.length > 3 ? 2 : 3)}  hover:opacity-75 text-xl  `}
                                                key={skill.name}>
                                                <div className="p-1  ">
                                                    <>
                                                        <CardContent  className="m-1 p-2 ">
                                                            <span className="font-black">{skill.name}</span>
                                                        </CardContent>
                                                    </>
                                                </div>
                                            </CarouselItem>
                                        ))}
                                    </CarouselContent>
                                    {vacancy.skills?.length > 3 &&
                                        <CarouselNext/>
                                    }
                                </Carousel>
                            </div>
                        )}
                        {vacancy.types_of_employ && vacancy.types_of_employ?.length > 0 &&
                            <>
                                <p>Тип занятости:</p>
                                <div className={'flex justify-center'}>
                                    {vacancy.types_of_employ?.map((type, index) => {
                                        return <p key={type.name}
                                                  className={'text-ellipsis rounded-2xl overflow-hidden m-1 hover:bg-gray-400 p-2'}>{type.name}</p>
                                    })}
                                </div>
                            </>
                        }
                        {/*<p key={city.id} className={'m-1 border  hover:bg-gray-500 p-2 rounded-2xl'}>{city.city}</p>*/}
                        <div className={'flex justify-center w-full  '}>
                            <Carousel opts={{align: 'start', dragFree: true,}} className="w- max-w-md  ">
                                <CarouselContent className={'-ml-4'}>
                                    {vacancy.cities?.map((city) => (
                                        <CarouselItem
                                            className={`basis-${vacancy.cities.length === 1 ? 'full' : (vacancy.cities.length > 3 ? 2 : 3)}  hover:opacity-75 pl-4 `}
                                            key={city.name}>
                                            <div className="p-1">
                                                <Card>
                                                    <CardContent className="m-1  p-2 rounded-2xl">
                                                        <span className="font-semibold">{city.name}</span>
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
                        <Button size={'lg'} type={'button'} onClick={()=> router.push(`${vacancy.id}`)}>Посмотреть</Button>
                    </div>
                </div>
                )
                }) : <div
                    className={'flex gap-2 flex-col shadow-lg m-4 p-4 border rounded-2xl w-[700px] h-96 justify-center'}>
                    <CircleX className={'self-center'} size={64}/>
                    <span className={'self-center text-3xl '}>Ничего не найдено</span>
                </div>}

        </div>
            )}
        </>

    );
};

export default VacancyCards;