'use client'
import React, {useEffect, useState} from 'react';
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card";
import {Button} from "@/components/ui/button";
import {useParams, usePathname, useRouter} from "next/navigation";
import {ResumeInfo, VacancyInfo} from "@/types/types";
import VacancyCardSkeleton from "@/components/ui/skeletons/VacancyCardSkeleton";
import {cn} from "@/lib/utils";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Link from "next/link";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import {Card, CardContent} from "@/components/ui/card";
import {SeparatorHorizontal} from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from 'embla-carousel-auto-scroll'
import {useAuth} from "@/components/providers";

const Page = () => {
    const pathname = usePathname()
    const {user} = useAuth()
    const router = useRouter()
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
    return (
        <>
            {resume ?
                (
                    <div className={'flex text-start  justify-center text-2xl  mt-12'}>
                        <Button onClick={() => router.back()} className={'self-start mt-8 space-x-2 hover:no-underline hover:opacity-75 transition-all'} type={'button'}
                                variant={'link'}>
                            <svg className={';'} width="25" height="25" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M6.85355 3.85355C7.04882 3.65829 7.04882 3.34171 6.85355 3.14645C6.65829 2.95118 6.34171 2.95118 6.14645 3.14645L2.14645 7.14645C1.95118 7.34171 1.95118 7.65829 2.14645 7.85355L6.14645 11.8536C6.34171 12.0488 6.65829 12.0488 6.85355 11.8536C7.04882 11.6583 7.04882 11.3417 6.85355 11.1464L3.20711 7.5L6.85355 3.85355ZM12.8536 3.85355C13.0488 3.65829 13.0488 3.34171 12.8536 3.14645C12.6583 2.95118 12.3417 2.95118 12.1464 3.14645L8.14645 7.14645C7.95118 7.34171 7.95118 7.65829 8.14645 7.85355L12.1464 11.8536C12.3417 12.0488 12.6583 12.0488 12.8536 11.8536C13.0488 11.6583 13.0488 11.3417 12.8536 11.1464L9.20711 7.5L12.8536 3.85355Z"
                                    fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                            </svg>
                            <span>
                        Назад
                    </span>
                        </Button>
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
                                        <Carousel opts={{align: 'start', dragFree: true}}
                                                  className="w- max-w-md   ">
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
                            {resume.types_of_employ && resume.types_of_employ?.length > 0 && (
                                <p className={'text-center flex justify-center font-extrabold'}>Тип занятости:</p>)}
                            <div className={'flex justify-center'}>

                                {resume.types_of_employ?.map((type, index) => {
                                    return <p key={type.name}
                                              className={'text-ellipsis text-center rounded-2xl overflow-hidden m-1 hover:bg-gray-400 p-2'}>{type.name}</p>
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
                                                                    <span
                                                                        className="font-semibold">{city.name}</span>
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
                                <h2 className={'font-black'}>Описание вакансии:</h2>
                                <p className={'text-start'}>{resume.description}</p>
                            </div>
                            <div className={'p-2 m-4 space-y-4'}>
                                <h2 className={'font-black'}>Контакты:</h2>
                                <p className={'text-start'}>{resume.description}</p>
                                <p className={'text-xs opacity-50'}>Вы можете связаться с соискателем по
                                    этим контактам</p>
                            </div>
                            <div className={'flex justify-end space-x-4'}>
                                {user?.id === resume.user_id &&
                                    <>
                                        <div className={'flex gap-x-4'}>
                                            <Button className={'rounded-full gap-x-2 '}
                                                    onClick={() => router.push(`${pathname}/edit`)}>
                                                Редактировать
                                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M12.1464 1.14645C12.3417 0.951184 12.6583 0.951184 12.8535 1.14645L14.8535 3.14645C15.0488 3.34171 15.0488 3.65829 14.8535 3.85355L10.9109 7.79618C10.8349 7.87218 10.7471 7.93543 10.651 7.9835L6.72359 9.94721C6.53109 10.0435 6.29861 10.0057 6.14643 9.85355C5.99425 9.70137 5.95652 9.46889 6.05277 9.27639L8.01648 5.34897C8.06455 5.25283 8.1278 5.16507 8.2038 5.08907L12.1464 1.14645ZM12.5 2.20711L8.91091 5.79618L7.87266 7.87267L8.12731 8.12732L10.2038 7.08907L13.7929 3.5L12.5 2.20711ZM9.99998 2L8.99998 3H4.9C4.47171 3 4.18056 3.00039 3.95552 3.01877C3.73631 3.03668 3.62421 3.06915 3.54601 3.10899C3.35785 3.20487 3.20487 3.35785 3.10899 3.54601C3.06915 3.62421 3.03669 3.73631 3.01878 3.95552C3.00039 4.18056 3 4.47171 3 4.9V11.1C3 11.5283 3.00039 11.8194 3.01878 12.0445C3.03669 12.2637 3.06915 12.3758 3.10899 12.454C3.20487 12.6422 3.35785 12.7951 3.54601 12.891C3.62421 12.9309 3.73631 12.9633 3.95552 12.9812C4.18056 12.9996 4.47171 13 4.9 13H11.1C11.5283 13 11.8194 12.9996 12.0445 12.9812C12.2637 12.9633 12.3758 12.9309 12.454 12.891C12.6422 12.7951 12.7951 12.6422 12.891 12.454C12.9309 12.3758 12.9633 12.2637 12.9812 12.0445C12.9996 11.8194 13 11.5283 13 11.1V6.99998L14 5.99998V11.1V11.1207C14 11.5231 14 11.8553 13.9779 12.1259C13.9549 12.407 13.9057 12.6653 13.782 12.908C13.5903 13.2843 13.2843 13.5903 12.908 13.782C12.6653 13.9057 12.407 13.9549 12.1259 13.9779C11.8553 14 11.5231 14 11.1207 14H11.1H4.9H4.87934C4.47686 14 4.14468 14 3.87409 13.9779C3.59304 13.9549 3.33469 13.9057 3.09202 13.782C2.7157 13.5903 2.40973 13.2843 2.21799 12.908C2.09434 12.6653 2.04506 12.407 2.0221 12.1259C1.99999 11.8553 1.99999 11.5231 2 11.1207V11.1206V11.1V4.9V4.87935V4.87932V4.87931C1.99999 4.47685 1.99999 4.14468 2.0221 3.87409C2.04506 3.59304 2.09434 3.33469 2.21799 3.09202C2.40973 2.71569 2.7157 2.40973 3.09202 2.21799C3.33469 2.09434 3.59304 2.04506 3.87409 2.0221C4.14468 1.99999 4.47685 1.99999 4.87932 2H4.87935H4.9H9.99998Z"
                                                        fill="currentColor" fillRule="evenodd"
                                                        clipRule="evenodd"></path>
                                                </svg>
                                            </Button>
                                        </div>
                                        <div>
                                            <Button className={'bg-destructive  rounded-full gap-x-2'}>
                                                Удалить
                                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z"
                                                        fill="currentColor" fillRule="evenodd"
                                                        clipRule="evenodd"></path>
                                                </svg>
                                            </Button>
                                        </div>
                                    </>
                                }
                            </div>
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