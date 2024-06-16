
import React, {useEffect, useState} from 'react';
import {Button} from "@/components/ui/button";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import {Card, CardContent} from "@/components/ui/card";
import {VacancyInfo} from "@/types/types";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import VacancyCardSkeleton from "@/components/ui/skeletons/VacancyCardSkeleton";
import {BadgeCheck, CircleX, Pencil, Trash2} from "lucide-react";
import {usePathname, useRouter} from "next/navigation";
import Link from "next/link";
import {formattedDate} from "@/hooks/formatDate";
import {useAuth} from "@/providers";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {useLogOut} from "@/hooks/useLogOut";
import ComplaintsForm from "@/components/forms/ComplaintsForm";



const VacancyCards = ({data, page, query, queryString}: {data:VacancyInfo[], page?:number, query?:string, queryString?:string}) => {
    const [hoveredVacancyId, setHoveredVacancyId] = useState<number | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const {user} = useAuth()
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
            setFilteredVacancies(prevVacancies => prevVacancies.filter(vacancy => vacancy.id !== vacancyId));
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
        {isLoading ? <VacancyCardSkeleton /> : (
            <div className={'text-center '}>
                {filteredVacancies && filteredVacancies.length > 0 ? filteredVacancies.map((vacancy) => {
                return (
                <div key={vacancy.id} className={'flex shadow p-4 m-2 my-6 rounded-2xl gap-5 border min-h-80'}
                     onMouseEnter={() => handleMouseEnter(vacancy.id)}
                     onMouseLeave={handleMouseLeave}
                >
                    <div className={'p-2  w-[500px] flex flex-col flex-grow  justify-center rounded relative'}>
                        <div className={' flex text-center justify-center p-2'}>
                            {hoveredVacancyId === vacancy.id &&
                                <ComplaintsForm report_user_id={user?.id} setHoveredResumeId={setHoveredVacancyId} setIsDialogOpen={setIsDialogOpen} vacancy_id={vacancy.id} report_username={user?.username}/>
                            }
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
                                <HoverCard>
                                    <HoverCardTrigger asChild>
                                        <Button variant="link" className={'gap-x-1'}>{vacancy.companyName}{vacancy.is_verified && <BadgeCheck color="#16a34a" size={18} />}</Button>
                                    </HoverCardTrigger>
                                    <HoverCardContent className="w-fit ">
                                        <div className="flex justify-between space-x-4 self-center " >
                                            <Avatar className={'self-center'}>
                                                <AvatarImage
                                                    src="https://acdn.tinkoff.ru/static/pages/files/d39e9d26-fd5e-4574-9ad3-c3f2fc102598.png"/>
                                                <AvatarFallback>VC</AvatarFallback>
                                            </Avatar>
                                            <div className="space-y-2 flex max-w-md flex-col  justify-center self-center ">
                                                <p className="text-sm flex gap-x-1 text-ellipsis overflow-hidden font-semibold">{vacancy.companyName}{vacancy.is_verified && <BadgeCheck size={18}  color="#16a34a" />}</p>
                                                <p className="text-xs max-w-32 max-h-14  text-ellipsis overflow-hidden">
                                                    {vacancy.companyDescription}
                                                </p>
                                                <div className="flex flex-col  items-center text-ellipsis  overflow-hidden pt-2">
                                                    <span
                                                        className="text-xs text-muted-foreground ">Присоединился в {formattedDate(vacancy.registered_at, true)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </HoverCardContent>
                                </HoverCard>
                        </div>
                        {vacancy.skills && vacancy.skills?.length > 0 && (
                            <div className={'flex justify-center m-2'}>
                                <Carousel opts={{align: 'start', dragFree: true}} className="w-96 max-w-xs justify-items-center   ">
                                    <CarouselContent  className={'-ml-4'}>
                                        {vacancy.skills?.map((skill) => (
                                            <CarouselItem
                                                className={`basis-${vacancy.skills.length === 1 ? 'full' : (vacancy.skills.length >= 2 ? '1/2' : '1/3')}  hover:opacity-75 pl-4 `}
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
                                    {vacancy.skills?.length >= 3 &&
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
                            <Carousel opts={{align: 'start', dragFree: true,}} className="max-w-md ">
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
                            <div className={'flex space-x-2 justify-end self-center top-0 p-2 absolute'}>
                                <div className={'flex gap-x-4'}>
                                    <Button className={'rounded-full gap-x-2 '}
                                            onClick={() => router.push(`${pathname}/${vacancy.id}/edit`)}>
                                        <Pencil  />
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
                                            <DialogHeader className={'self-center p-2 text-center'}>
                                                <DialogTitle >Вы уверены, что хотите удалить вакансию?</DialogTitle>
                                                <DialogDescription className={'font-boldtext-center font-bold text-md text-destructive rounded'}> После подтверждения вакансия удалится без возможности восстановления</DialogDescription>
                                            </DialogHeader>
                                            <div className={'flex justify-center space-x-4'}>
                                                <Button size={'lg'} className={'font-bold bg-destructive dark:text-white hover:text-inherit hover:bg-destructive dark:hover:bg-destructive dark:hover:text-black'} type={"submit"} onClick={() =>deleteVacancy(vacancy.id)}>Да, удалить</Button>
                                                <DialogClose asChild>
                                                    <Button size={'lg'} className={'flex self-center bg-green-600 font-bold'}>Нет</Button>
                                                </DialogClose>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </div>
                        }
                        <Button size={'lg'} type={'button'}
                                onClick={() => router.push(`${pathname}/${vacancy.id}`)}>Посмотреть
                        </Button>
                        <div className={'absolute bottom-2 text-xs opacity-50'}>
                                <p>Создано</p>
                                <p>{formattedDate(vacancy.created_at)}</p>
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
                            <p className={'text-md opacity-75'}> Попробуйте обновить страницу</p>
                        </div>
                    </div>
                }

            </div>
        )}
        </>

    );
};

export default VacancyCards;