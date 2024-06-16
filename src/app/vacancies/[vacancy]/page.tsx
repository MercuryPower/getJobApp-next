'use client'
import React, {useEffect, useState} from 'react';
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card";
import {Button} from "@/components/ui/button";
import {useParams, usePathname, useRouter} from "next/navigation";
import {VacancyInfo} from "@/types/types";
import VacancyCardSkeleton from "@/components/ui/skeletons/VacancyCardSkeleton";
import {cn} from "@/lib/utils";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Link from "next/link";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import {Card, CardContent} from "@/components/ui/card";
import {BadgeCheck, Pencil, SeparatorHorizontal, Trash2} from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from 'embla-carousel-auto-scroll'
import {useAuth} from "@/providers";
import {formattedDate} from "@/hooks/formatDate";
import {Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import ComplaintsForm from "@/components/forms/ComplaintsForm";

const Page = () => {
    const [hoveredVacancyId, setHoveredVacancyId] = useState<number | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const pathname = usePathname();
    const {user} = useAuth()
    const params = useParams();
    const router = useRouter();
    const [vacancy, setVacancy] = useState<VacancyInfo>();
    useEffect(() => {
        const fetchResume = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/tests/vacancy/${params.vacancy}`);
                if (!response.ok) {
                    throw new Error('Ошибка при сборе данных о резюме');
                }
                const data = await response.json();

                if (data.is_reported && user?.is_superuser) {
                    const reportedResponse = await fetch(`http://127.0.0.1:8000/tests/reported_vacancy/${params.vacancy}`,{
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        },
                    });
                    if (!reportedResponse.ok) {
                        throw new Error('Ошибка при сборе данных о репортед вакансии');
                    }
                    const reportedData = await reportedResponse.json();
                    setVacancy(reportedData);
                } else {
                    setVacancy(data);
                }
            } catch (error) {
                console.error('Ошибка при сборе данных:', error);
            }
        };
        void fetchResume();
    }, [params.vacancy, user]);
    const deleteVacancy = async (vacancyId: number) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/tests/delete_vacancy/${vacancyId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            if (!response.ok) {
                throw new Error('Failed to delete vacancy');
            }
            router.replace(`/vacancies`)
        } catch (error) {
            console.error('Ошибка при удалении вакансии:', error);
        }
    };
    const handleMouseEnter = (resumeId: number) => {
        setHoveredVacancyId(resumeId);
    };

    const handleMouseLeave = () => {
        if(!isDialogOpen){
            setHoveredVacancyId(null);
        }
    };

    return (
        <>
        {vacancy ?
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
                    <div className={'p-2  w-[1000px] flex flex-col rounded border'}
                         onMouseEnter={() => handleMouseEnter(vacancy.id)}
                         onMouseLeave={handleMouseLeave}>
                        <div className={' flex text-center justify-center gap-x-8 p-2 mt-4 relative'}>
                            <div className={'flex justify-center self-center'}>
                                <Avatar>
                                    <AvatarImage
                                        sizes={'500px'}
                                        src="https://acdn.tinkoff.ru/static/pages/files/d39e9d26-fd5e-4574-9ad3-c3f2fc102598.png"/>
                                    <AvatarFallback>VC</AvatarFallback>
                                </Avatar>
                            </div>
                            <div>
                                {hoveredVacancyId === vacancy.id &&
                                    <div className={'flex justify-center self-center'}>
                                    <ComplaintsForm
                                        isFull
                                        report_user_id={user?.id}
                                        setHoveredResumeId={setHoveredVacancyId}
                                        setIsDialogOpen={setIsDialogOpen}
                                        vacancy_id={vacancy.id}
                                        report_username={user?.username}/>
                                    </div>
                                }
                                <Link href={`${vacancy.id}`}>
                                    <p className={'text-5xl text-center  text-ellipsis overflow-hidden font-bold  cursor-pointer'}>{vacancy.exp} {vacancy.vacancy_name}</p>
                                </Link>
                            </div>
                                {user?.id === vacancy.user_id &&
                                    <div className={'flex space-x-2 justify-end self-center relative'}>
                                        <div className={'flex gap-x-4'}>
                                            <Button className={'rounded-full gap-x-2 '}
                                                    onClick={() => router.push(`${pathname}/edit`)}>
                                                <Pencil />
                                            </Button>
                                        </div>
                                        <div>
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button className={'bg-destructive  rounded-full gap-x-2'}>
                                                        <Trash2 />
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className={'flex self-justify-center flex-col'} >
                                                    <DialogHeader className={'self-center'}>
                                                        <DialogTitle >Вы уверены, что хотите удалить вакансию?</DialogTitle>
                                                    </DialogHeader>
                                                    <div className={'flex justify-center space-x-4'}>
                                                        <Button size={'lg'} className={'flex self-center font-bold text-lg'} type={"submit"} onClick={() =>deleteVacancy(vacancy.id)}>Да, удалить</Button>
                                                        <DialogClose asChild>
                                                            <Button size={'lg'} className={'flex self-center  bg-green-600  font-bold'}>Нет</Button>
                                                        </DialogClose>
                                                    </div>
                                                </DialogContent>
                                            </Dialog>
                                        </div>
                                    </div>
                                }
                        </div>
                        {vacancy.salary_type === 'range' ?
                            <p className={'text-center text-3xl font-light text-ellipsis overflow-hidden '}>{vacancy.min_salary} - {vacancy.max_salary} &#8381; </p>

                            :
                            vacancy.salary_type === 'fixed' ? (
                                <p className={'text-center text-3xl font-light text-ellipsis overflow-hidden '}>{vacancy.fixed_salary} &#8381;</p>
                            ) : (
                                <p className={'text-center text-2xl font-light text-ellipsis overflow-hidden '}>по
                                    договоренности </p>
                            )
                        }
                        <div className={'flex flex-col justify-center p-2 max-h-23'}>
                            <HoverCard>
                                <HoverCardTrigger asChild>
                                    <Button variant="link" className={'gap-x-1'}>{vacancy.companyName}{vacancy.is_verified && <BadgeCheck color="#16a34a" />}</Button>
                                </HoverCardTrigger>
                                <HoverCardContent className="w-fit ">
                                    <div className="flex justify-between space-x-4 self-center ">
                                        <Avatar className={'self-center'}>
                                            <AvatarImage
                                                src="https://acdn.tinkoff.ru/static/pages/files/d39e9d26-fd5e-4574-9ad3-c3f2fc102598.png"/>
                                            <AvatarFallback>VC</AvatarFallback>
                                        </Avatar>
                                        <div className="space-y-2 flex max-w-md flex-col  justify-center self-center ">
                                            <p className="text-xl font-bold flex text-ellipsis overflow-hidden gap-x-1">@{vacancy.companyName}{vacancy.is_verified && <BadgeCheck color="#16a34a" />}</p>
                                            <p className="text-xs max-w-32 max-h-14  text-ellipsis overflow-hidden">
                                                {vacancy.companyDescription}
                                            </p>
                                            <div
                                                className="flex flex-col  items-center text-ellipsis  overflow-hidden pt-2">
                                                    <span
                                                        className="text-xs text-muted-foreground ">Присоединился в {formattedDate(vacancy.registered_at, false)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </HoverCardContent>
                            </HoverCard>
                        </div>
                        {vacancy.skills && vacancy.skills?.length > 0 && (
                            <>
                                <div className={'flex  flex-col self-center justify-center m-2'}>
                                    <h2 className={'font-extrabold self-center p-2'}>Скиллы:</h2>
                                    <Carousel opts={{align: 'start', dragFree: true}} className="w- max-w-md   ">
                                        <CarouselContent className={'-ml-4'}>
                                            {vacancy.skills?.map((skill) => (
                                                <CarouselItem
                                                    className={`basis-${vacancy.skills.length === 1 ? 'full' : (vacancy.skills.length > 3 ? 2 : 3)}  hover:opacity-75 text-3xl `}
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
                                        {vacancy.skills?.length > 3 &&
                                            <CarouselNext/>
                                        }
                                    </Carousel>
                                </div>
                            </>
                        )}
                        {vacancy.types_of_employ && vacancy.types_of_employ?.length > 0 && (<p className={'self-center font-extrabold'}>Тип занятости:</p>)}
                        <div className={'flex justify-center'}>
                            {vacancy.types_of_employ?.map((type, index) => {
                                return <p key={type.name}
                                          className={'text-ellipsis rounded-2xl overflow-hidden m-1 hover:bg-gray-400 p-2'}>{type.name}</p>
                            })}
                        </div>
                        {/*<p key={city.id} className={'m-1 border  hover:bg-gray-500 p-2 rounded-2xl'}>{city.city}</p>*/}
                        {vacancy.cities.length > 0 &&
                            <>
                                <h2 className={'font-extrabold self-center p-2'}>Город:</h2>
                                <div className={'flex justify-center w-full  '}>
                                    <Carousel opts={{align: 'start', dragFree: true,}} className="max-w-md  ">
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
                                        <CarouselPrevious/>
                                        <CarouselNext/>
                                    </Carousel>
                                </div>
                            </>
                        }
                        <div className={'p-2 m-4 space-y-4'}>
                            {vacancy.companyDescription !== null &&
                                <>
                                    <h2><span className={'font-extrabold'}>@{vacancy.companyName}</span> - {vacancy.companyDescription}. </h2>
                                </>
                            }
                        </div>
                        <div className={'p-2 m-4 space-y-4'}>
                            <h2 className={'font-extrabold'}>Описание вакансии:</h2>
                            <p className={'text-start'}>{vacancy.description}</p>
                        </div>
                        <div className={'p-2 m-4 space-y-4'}>
                            <h2 className={'font-black'}>Контакты:</h2>
                            <p className={'text-start'}>{vacancy.description}</p>
                            <p className={'text-xs opacity-50'}>Вы можете связаться с работодателем по
                                этим контактам</p>
                        </div>
                        {user?.is_superuser &&
                            vacancy.reports?.map((report) => (
                                <div key={report.id} className={'flex mt-3 flex-col  self-center shadow border-destructive gap-y-2 rounded-2xl border min-h-40 min-w-full p-2'}>
                                    <div className={'flex flex-col space-x-2 justify-center'}>
                                        <h2 className={'text-3xl mt-2 bg-destructive self-center rounded p-2 m-2 text-white flex justify-center font-bold'}>Жалоба от {report.report_username}</h2>
                                        <h3 className={'text-xl font-light self-center text-muted-foreground'}>{report.report_username !== 'Аноним' &&`(UserID:${report.report_user_id})`} (ReportID:{report.id})</h3>
                                    </div>
                                    <h2 className={'text-2xl text-center font-bold self-center bg-accent rounded'}>{report.report_type}</h2>
                                    <h2 className={'text-xl text-center self-center rounded'}>{report.report_description}</h2>
                                </div>
                            ))
                        }
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
        ;
    }
;

export default Page;