'use client'
import React, {useEffect, useState} from 'react';
import Link from "next/link";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card";
import {Button} from "@/components/ui/button";
import {Carousel, CarouselContent, CarouselItem, CarouselNext} from "@/components/ui/carousel";
import {Card, CardContent} from "@/components/ui/card";
import {CircleX, Pencil, Trash2} from "lucide-react";
import {useParams, usePathname, useRouter} from "next/navigation";
import {useAuth} from "@/components/providers";
import VacancyCards from "@/components/VacancyCards";
import {VacancyInfo} from "@/types/types";
import VacancyCardSkeleton from "@/components/ui/skeletons/VacancyCardSkeleton";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import {formattedDate} from "@/hooks/formatDate";
import {auth} from "@/auth";

const Page = () => {
    const router = useRouter();
    const {user, isLoggedIn} = useAuth();
    const params = useParams();
    const pathname = usePathname()
    const [myVacancies, setMyVacancies] = useState<VacancyInfo[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchVacancy = async () => {
            setIsLoading(true)
            try {
                const response = await fetch(`http://127.0.0.1:8000/tests/vacancy_by_user`,{
                    method:'GET',
                    headers:{
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch vacancy');
                }
                const data = await response.json();
                setMyVacancies(data);
            } catch (error) {
                console.error('Ошибка при сборе данных:', error);
            } finally {
                setIsLoading(false)
            }
        };

        void fetchVacancy();
    }, []);
    useEffect(() => {
        if(!isLoggedIn){
            return router.replace('/')
        }
    }, [isLoggedIn, router]);
    if(!isLoggedIn){
        return null;
    }
    return (
    <>
        <div className={'flex justify-center'}>
            <h1 className={'text-3xl font-extrabold mt-4 p-2  rounded-2xl'}>Мои вакансии</h1>
        </div>
        {isLoading ? (
            <div className={'flex justify-center self-center'}>
                <VacancyCardSkeleton/>
             </div>
        ) : (
            <div className={'text-center flex-col flex justify-center '}>
                {myVacancies.length > 0 ? myVacancies.map((vacancy) => {
                    return (
                        <div key={vacancy.id}
                             className={'flex justify-center self-center shadow p-4 m-2 my-6 rounded-2xl  gap-5 border'}>
                            <div className={'p-2  w-[500px] flex flex-col flex-grow rounded'}>
                                <div className={' flex text-center justify-center p-2'}>
                                    <Link href={`${vacancy.id}`}>
                                        <p className={'text-3xl text-ellipsis overflow-hidden font-bold  cursor-pointer'}>{vacancy.exp} {vacancy.vacancy_name}</p>
                                    </Link>
                                </div>
                                {vacancy.salary_type === 'range' ?
                                    <p className={'text-center text-2xl font-light text-ellipsis overflow-hidden '}>{vacancy.min_salary} - {vacancy.max_salary} &#8381; </p>

                                    :
                                    vacancy.salary_type === 'fixed' ? (
                                        <p className={'text-center text-2xl font-light text-ellipsis overflow-hidden '}>{vacancy.fixed_salary} &#8381;</p>
                                    ) : (
                                        <p className={'text-center text-2xl  font-light text-ellipsis overflow-hidden '}>по
                                            договоренности </p>
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
                                                <Button variant="link">{vacancy.companyName}</Button>
                                            </HoverCardTrigger>
                                            <HoverCardContent className="w-fit ">
                                                <div className="flex justify-between space-x-4 self-center ">
                                                    <Avatar className={'self-center'}>
                                                        <AvatarImage
                                                            src="https://acdn.tinkoff.ru/static/pages/files/d39e9d26-fd5e-4574-9ad3-c3f2fc102598.png"/>
                                                        <AvatarFallback>VC</AvatarFallback>
                                                    </Avatar>
                                                    <div
                                                        className="space-y-2 flex max-w-md flex-col  justify-center self-center ">
                                                        <h4 className="text-sm text-ellipsis overflow-hidden font-semibold">{vacancy.companyName}</h4>
                                                        <p className="text-sm max-w-32 text-ellipsis overflow-hidden">
                                                            {vacancy.companyDescription}
                                                        </p>
                                                        <div
                                                            className="flex flex-col  items-center text-ellipsis  overflow-hidden pt-2">
                                                    <span
                                                        className="text-xs text-muted-foreground ">Присоединился в {formattedDate(vacancy.registered_at, true)}</span>
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
                                                        className={`basis-${vacancy.skills.length === 1 ? 'full' : (vacancy.skills.length > 3 ? '1/2' : '1/3')}  hover:opacity-75 text-xl  `}
                                                        key={skill.name}>
                                                        <div className="p-1  ">
                                                            <CardContent className="m-1 p-2 ">
                                                                <span className="font-black">{skill.name}</span>
                                                            </CardContent>
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
                                                    className={`basis-${vacancy.cities.length === 1 ? 'full' : (vacancy.cities.length >= 2 ? '1/2' : '1/3')}  hover:opacity-75 pl-4 `}
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
                            <div className={'flex flex-col justify-center items-center relative'}>
                                {user?.id === vacancy.user_id &&
                                    <div className={'flex space-x-2 justify-end self-center top-4 absolute'}>
                                        <div className={'flex gap-x-4'}>
                                            <Button className={'rounded-full gap-x-2 '}
                                                    onClick={() => router.push(`${vacancy.id}/edit`)}>
                                                <Pencil/>
                                            </Button>
                                        </div>
                                        <div>
                                            <Button className={'bg-destructive  rounded-full gap-x-2'}>
                                                <Trash2/>
                                            </Button>
                                        </div>
                                    </div>
                                }
                                <Button size={'lg'} type={'button'}
                                        onClick={() => router.push(`${vacancy.id}`)}>Посмотреть
                                </Button>
                                <div className={'absolute bottom-2 text-xs opacity-50'}>
                                    {formattedDate(vacancy.created_at)}
                                </div>
                            </div>
                        </div>
                    )
                    }) :
                    <div
                        className={'flex self-center gap-2 flex-col shadow-lg m-4 p-4 border rounded-2xl w-[700px] m h-96 justify-center'}>
                        <CircleX className={'self-center'} size={64}/>
                        <span className={'self-center text-3xl font-extrabold '}>Вакансии не найдены</span>
                        <div className={'mt-2'}>
                            <p className={'text-md opacity-75'}> Вакансии ещё не созданы.</p>
                            <p className={'text-lg opacity-75 font-bold'}>или</p>
                            <p className={'text-md opacity-75'}>Попробуйте повторить ещё раз.</p>
                        </div>
                    </div>
                }
            </div>
        )}
    </>
    )
};

export default Page;