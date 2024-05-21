'use client'
import React, {useEffect, useState} from 'react';
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card";
import {Button} from "@/components/ui/button";
import {useParams} from "next/navigation";
import {VacancyInfo} from "@/types/types";
import VacancyCardSkeleton from "@/components/ui/skeletons/VacancyCardSkeleton";
import {cn} from "@/lib/utils";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Link from "next/link";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import {Card, CardContent} from "@/components/ui/card";
import {SeparatorHorizontal} from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from 'embla-carousel-auto-scroll'
interface ResumeInfo extends VacancyInfo{
    resume: string;
}
const Page = () => {
        const params = useParams();
        const [resume, setResume] = useState<ResumeInfo>();
        useEffect(() => {
            const fetchVacancy = async () => {
                try {
                    // Отправляем запрос на сервер, используя id из параметров URL
                    const response = await fetch(`http://127.0.0.1:8000/tests/vacancy/${params.resume}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch vacancy');
                    }
                    const data = await response.json();
                    setResume(data);
                } catch (error) {
                    console.error('Ошибка при сборе данных:', error);
                }
            };

            void fetchVacancy();
        }, [params.resume]);
        console.log(resume)
        return (
            <>
                {resume ?
                    (
                        <div className={'flex text-start  justify-center text-2xl  mt-12'}>
                            <div className={'p-2  w-[1000px] flex flex-col rounded border'}>
                                <div className={' flex text-center justify-center p-2 mt-4'}>
                                    <div className={'flex mr-6 justify-center'}>
                                        <Avatar>
                                            <AvatarImage
                                                src="https://acdn.tinkoff.ru/static/pages/files/d39e9d26-fd5e-4574-9ad3-c3f2fc102598.png"/>
                                            <AvatarFallback>VC</AvatarFallback>
                                        </Avatar>
                                    </div>
                                    <Link href={`${resume.id}`}>
                                        <p className={'text-5xl text-center  text-ellipsis overflow-hidden font-bold  cursor-pointer'}>{resume.exp} {resume.vacancy_name}</p>
                                    </Link>
                                </div>
                                {resume.salary_type === 'range' ?
                                    <p className={'text-center text-3xl font-light text-ellipsis overflow-hidden '}>{resume.min_salary} - {resume.max_salary} &#8381; </p>

                                    :
                                    resume.salary_type === 'fixed' ? (
                                        <p className={'text-center text-3xl font-light text-ellipsis overflow-hidden '}>{resume.fixed_salary} &#8381;</p>
                                    ) : (
                                        <p className={'text-center text-2xl font-light text-ellipsis overflow-hidden '}>по
                                            договоренности </p>
                                    )
                                }
                                <div className={'flex justify-center p-2 max-h-23'}>
                                    <HoverCard>
                                        <HoverCardTrigger asChild>
                                            <Button variant="link">{'vacancy.companyName'}</Button>
                                        </HoverCardTrigger>
                                        <HoverCardContent className="w-fit ">
                                            <div className="flex justify-between space-x-4 self-center ">
                                                <Avatar className={'self-center'}>
                                                    <AvatarImage
                                                        src="https://acdn.tinkoff.ru/static/pages/files/d39e9d26-fd5e-4574-9ad3-c3f2fc102598.png"/>
                                                    <AvatarFallback>VC</AvatarFallback>
                                                </Avatar>
                                                <div
                                                    className="space-y-2 flex flex-col  justify-center self-center ">
                                                    <p className="text-sm text-ellipsis overflow-hidden font-semibold">{"vacancy.companyName"}</p>
                                                    <p className="text-sm max-w-32 text-ellipsis overflow-hidden">
                                                        {`vacancy.descriptionaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`}
                                                    </p>
                                                    <div
                                                        className="flex flex-col  items-center text-ellipsis  overflow-hidden pt-2">
                                                    <span
                                                        className="text-xs text-muted-foreground ">Joined December 2021</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </HoverCardContent>
                                    </HoverCard>
                                </div>
                                {resume.skills && resume.skills?.length > 0 && (
                                    <>
                                        <div className={'flex  flex-col self-center justify-center m-2'}>
                                            <h2 className={'font-extrabold self-center p-2'}>Скиллы:</h2>
                                            <Carousel opts={{align: 'start', dragFree: true }}  className="w- max-w-md   ">
                                                <CarouselContent className={'-ml-4'}>
                                                    {resume.skills?.map((skill) => (
                                                        <CarouselItem
                                                            className={`basis-${resume.skills.length === 1 ? 'full' : (resume.skills.length > 3 ? 2 : 3)}  hover:opacity-75 text-3xl `}
                                                            key={skill.name}>
                                                            <div className="p-1">
                                                                <>
                                                                    <CardContent className="m-1  p-2">
                                                                        <span className="font-black">{skill.name}</span>
                                                                    </CardContent>
                                                                </>
                                                            </div>
                                                        </CarouselItem>
                                                    ))}
                                                </CarouselContent>
                                                {resume.skills?.length > 3 &&
                                                    <CarouselNext/>
                                                }
                                            </Carousel>
                                        </div>
                                    </>
                                )}
                                <div className={'flex justify-center'}>
                                    {resume.types_of_employ && resume.types_of_employ?.length > 0 && (<p>Тип занятости:</p>)}
                                    {resume.types_of_employ?.map((type, index) => {
                                        return <p key={type.name}
                                                  className={'text-ellipsis rounded-2xl overflow-hidden m-1 hover:bg-gray-400 p-2'}>{type.name}</p>
                                    })}
                                </div>
                                {/*<p key={city.id} className={'m-1 border  hover:bg-gray-500 p-2 rounded-2xl'}>{city.city}</p>*/}
                                {resume.cities.length > 0 &&
                                    <>
                                        <h2 className={'font-extrabold self-center p-2'}>Город:</h2>
                                        <div className={'flex justify-center w-full  '}>
                                            <Carousel opts={{align: 'start', dragFree: true,}} className="max-w-md  ">
                                                <CarouselContent className={'-ml-4'}>
                                                    {resume.cities?.map((city) => (
                                                        <CarouselItem
                                                            className={`basis-${resume.cities.length === 1 ? 'full' : (resume.cities.length > 3 ? 2 : 3)}  hover:opacity-75 pl-4 `}
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
                                                <CarouselPrevious/>
                                                <CarouselNext/>
                                            </Carousel>
                                        </div>
                                    </>
                                }
                                <div className={'p-2 m-4 space-y-4'}>
                                    <h2 className={'font-extrabold'}>Описание вакансии:</h2>
                                    <p className={'text-start'}>{resume.description}</p>
                                </div>
                                <div className={'p-2 m-4 space-y-4'}>
                                    <h2 className={'font-extrabold'}>Контакты:</h2>
                                    <p className={'text-start'}>{resume.description}</p>
                                </div>
                                    <h4>Вы можете связаться с работадателем по этим контактам</h4>
                            </div>
                        </div>
                    ) : (
                        <div className={'flex justify-center self-center mt-24'}>
                            <LoadingSpinner width={32} height={32}/>
                        </div>
                    )
                }
            </>
        )
    }

export default Page;