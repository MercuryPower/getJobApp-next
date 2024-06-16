'use client'
import React, {useEffect, useState} from 'react';
import Link from "next/link";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card";
import {Button} from "@/components/ui/button";
import {Carousel, CarouselContent, CarouselItem, CarouselNext} from "@/components/ui/carousel";
import {Card, CardContent} from "@/components/ui/card";
import {BadgeCheck, ChevronsRight, CircleX, Pencil, Trash2} from "lucide-react";
import {useParams, usePathname, useRouter} from "next/navigation";
import {useAuth} from "@/providers";
import VacancyCards from "@/components/cards/VacancyCards";
import {VacancyInfo} from "@/types/types";
import VacancyCardSkeleton from "@/components/ui/skeletons/VacancyCardSkeleton";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import {formattedDate} from "@/hooks/formatDate";
import {auth} from "@/auth";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";

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
            setMyVacancies(prevVacancies => prevVacancies.filter(vacancy => vacancy.id !== vacancyId));
        } catch (error) {
            console.error('Ошибка при удалении вакансии:', error);
        }
    };
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
                {user?.type === 'company' &&
                        <Button onClick={() => router.push(`/vacancies/create`)}  type={'button'} size={"lg"} className={"h-12 border-black bg-green-600 rounded font-bold transition flex self-center justify-e space-x-2"} >
                            <svg width="30" height="30" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                            <span>Создать вакансию</span>
                        </Button>
                }
                {myVacancies && myVacancies.length > 0 ? myVacancies.map((vacancy) => {
                    return (
                        <div key={vacancy.id}
                             className={'flex justify-center self-center shadow p-4 m-2 my-6 rounded-2xl  gap-5 border min-h-80'}>
                            <div className={'p-2  w-[500px]  flex flex-col flex-grow rounded'}>
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
                                    <HoverCard>
                                        <HoverCardTrigger asChild>
                                            <div className={'flex'}>
                                                <Avatar  className={'self-center cursor-pointer w-12 h-12'}>
                                                    {vacancy?.photo_url ?
                                                        <AvatarImage alt={'profile-picture'}
                                                                     src={`data:image/jpeg;base64,${vacancy?.photo_url}`}
                                                        />
                                                        :
                                                        <AvatarImage alt={'profile-default-picture'}
                                                                     src='https://cdn-icons-png.flaticon.com/512/8801/8801434.png'
                                                        />
                                                    }
                                                </Avatar>
                                                <Button variant="link" className={'gap-x-1 self-center'}>{vacancy.companyName}{vacancy.is_verified && <BadgeCheck color="#16a34a" size={18} />}</Button>
                                            </div>
                                        </HoverCardTrigger>
                                        <HoverCardContent className="w-fit ">
                                            <div className="flex justify-between space-x-4 self-center " >
                                                <Avatar  className={'self-center cursor-pointer w-12 h-12'}>
                                                    {vacancy?.photo_url ?
                                                        <AvatarImage alt={'profile-picture'}
                                                                     src={`data:image/jpeg;base64,${vacancy?.photo_url}`}
                                                        />
                                                        :
                                                        <AvatarImage alt={'profile-default-picture'}
                                                                     src='https://cdn-icons-png.flaticon.com/512/8801/8801434.png'
                                                        />
                                                    }
                                                </Avatar>
                                                <div className="space-y-2 flex max-w-md flex-col  justify-center self-center ">
                                                    <p className="text-sm text-start flex gap-x-1 text-ellipsis overflow-hidden font-semibold">{vacancy.companyName}{vacancy.is_verified && <BadgeCheck size={18}  color="#16a34a" />}</p>
                                                    <p className="text-xs text-start max-w-64 max-h-20  text-ellipsis overflow-hidden">
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
                                        <Carousel opts={{align: 'start', dragFree: true}} className="w- max-w-md   ">
                                            <CarouselContent className={'-ml-4 justify-center'}>
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
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button className={'bg-destructive  rounded-full gap-x-2'}>
                                                        <Trash2 />
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className={'flex self-justify-center flex-col ' } >
                                                    <DialogHeader className={'self-center p-2 text-center'}>
                                                        <DialogTitle >Вы уверены, что хотите удалить вакансию?</DialogTitle>
                                                        <DialogDescription className={'font-boldtext-center font-bold text-md text-destructive rounded'}> После подтверждения вакансия удалится без возможности восстановления</DialogDescription>
                                                    </DialogHeader>
                                                    <div className={'flex justify-center space-x-4 '}>
                                                        <Button size={'lg'} className={'font-bold bg-destructive dark:text-white hover:text-inherit hover:bg-destructive dark:hover:bg-destructive dark:hover:text-black'} type={"submit"} onClick={() =>deleteVacancy(vacancy.id)}>Да, удалить</Button>
                                                        <DialogClose asChild>
                                                            <Button size={'lg'} className={'flex self-center font-bold bg-green-600'}>Нет</Button>
                                                        </DialogClose>
                                                    </div>
                                                </DialogContent>
                                            </Dialog>
                                        </div>
                                    </div>
                                }
                                <Button size={'lg'} type={'button'}
                                        onClick={() => router.push(`${vacancy.id}`)}>Посмотреть
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