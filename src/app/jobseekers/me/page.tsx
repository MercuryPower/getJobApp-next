'use client'
import React, {useEffect, useState} from 'react';
import Link from "next/link";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card";
import {Button} from "@/components/ui/button";
import {Carousel, CarouselContent, CarouselItem, CarouselNext} from "@/components/ui/carousel";
import {Card, CardContent} from "@/components/ui/card";
import {BadgeCheck, CircleX, Pencil, Trash2} from "lucide-react";
import {useParams, useRouter} from "next/navigation";
import {useAuth} from "@/providers";
import {ResumeInfo, VacancyInfo} from "@/types/types";
import VacancyCardSkeleton from "@/components/ui/skeletons/VacancyCardSkeleton";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import {formattedDate} from "@/hooks/formatDate";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {DELETE_VACANCY, GET_MY_VACANCIES_OR_RESUMES} from "@/url/urls";

const Page = () => {
    const router = useRouter();
    const {user, isLoggedIn} = useAuth();
    const params = useParams();
    const [myResumes, setMyResumes] = useState<ResumeInfo[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchVacancy = async () => {
            setIsLoading(true)
            try {
                const response = await fetch(GET_MY_VACANCIES_OR_RESUMES,{
                    method:'GET',
                    headers:{
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch vacancy');
                }
                const data = await response.json();
                setMyResumes(data);
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
    const deleteResume = async (resumeId: number) => {
        try {
            const response = await fetch(`${DELETE_VACANCY}/${resumeId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            if (!response.ok) {
                throw new Error('Failed to delete vacancy');
            }
            setMyResumes(prevResumes => prevResumes.filter(resume => resume.id !== resumeId));
        } catch (error) {
            console.error('Ошибка при удалении вакансии:', error);
        }
    };
    return (
        <>
            <div className={'flex justify-center'}>
                <h1 className={'text-3xl font-extrabold mt-4 p-2  rounded-2xl'}>Мои резюме</h1>
            </div>
            {isLoading ? (
                <div className={'flex justify-center self-center mt-24'}>
                    <LoadingSpinner width={48} height={48}/>
                </div>
            ) : (
                <div className={'text-center flex-col flex justify-center '}>
                    {user?.type === 'user' &&
                        <Button onClick={() => router.push(`/jobseekers/create`)}  type={'button'} size={"lg"} className={"h-12 border-black bg-green-600 rounded font-bold transition flex self-center justify-e space-x-2"} >
                            <svg width="30" height="30" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                            <span>Создать резюме</span>
                        </Button>
                    }
                    {myResumes.length > 0 ? myResumes.map((resume) => {
                            return (
                                <div key={resume.id} className={'flex justify-center self-center shadow p-4 m-2 my-6 rounded-2xl  gap-5 border'}>
                                    <div className={'p-2  w-[500px] flex flex-col flex-grow rounded'}>
                                        <div className={' flex text-center justify-center p-2'}>
                                            <Link href={`${resume.id}`}>
                                                <p className={'text-3xl text-ellipsis overflow-hidden font-bold  cursor-pointer'}>{resume.exp} {resume.vacancy_name}</p>
                                            </Link>
                                        </div>
                                        {resume.salary_type === 'range' ?
                                            <p className={'text-center text-2xl font-light text-ellipsis overflow-hidden '}>{resume.min_salary} - {resume.max_salary} &#8381; </p>

                                            :
                                            resume.salary_type === 'fixed' ? (
                                                <p className={'text-center text-2xl font-light text-ellipsis overflow-hidden '}>{resume.fixed_salary} &#8381;</p>
                                            ): (
                                                <p className={'text-center text-2xl  font-light text-ellipsis overflow-hidden '}>по договоренности </p>
                                            )
                                        }
                                        <div className={'flex justify-center p-2'}>
                                            <HoverCard>
                                                <HoverCardTrigger asChild>
                                                    <div className={'flex'}>
                                                        <Avatar  className={'self-center cursor-pointer w-12 h-12'}>
                                                            {resume?.photo_url ?
                                                                <AvatarImage alt={'profile-picture'}
                                                                             src={`data:image/jpeg;base64,${resume?.photo_url}`}
                                                                />
                                                                :
                                                                <AvatarImage alt={'profile-default-picture'}
                                                                             src='https://cdn-icons-png.flaticon.com/512/8801/8801434.png'
                                                                />
                                                            }
                                                        </Avatar>
                                                        <Button variant="link" className={'gap-x-1 self-center'}>{resume.companyName}{resume.is_verified && <BadgeCheck color="#16a34a" size={18} />}</Button>
                                                    </div>
                                                </HoverCardTrigger>
                                                <HoverCardContent className="w-fit ">
                                                    <div className="flex justify-between space-x-4 self-center " >
                                                        <Avatar  className={'self-center cursor-pointer w-12 h-12'}>
                                                            {resume?.photo_url ?
                                                                <AvatarImage alt={'profile-picture'}
                                                                             src={`data:image/jpeg;base64,${resume?.photo_url}`}
                                                                />
                                                                :
                                                                <AvatarImage alt={'profile-default-picture'}
                                                                             src='https://cdn-icons-png.flaticon.com/512/8801/8801434.png'
                                                                />
                                                            }
                                                        </Avatar>
                                                        <div className="space-y-2 flex max-w-md flex-col  justify-center self-center ">
                                                            <p className="text-sm text-start flex gap-x-1 text-ellipsis overflow-hidden font-semibold">{resume.companyName}{resume.is_verified && <BadgeCheck size={18}  color="#16a34a" />}</p>
                                                            <p className="text-xs text-start max-w-64 max-h-20  text-ellipsis overflow-hidden">
                                                                {resume.companyDescription}
                                                            </p>
                                                            <div className="flex flex-col  items-center text-ellipsis  overflow-hidden pt-2">
                                                    <span
                                                        className="text-xs text-muted-foreground ">Присоединился в {formattedDate(resume.registered_at, true)}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </HoverCardContent>
                                            </HoverCard>
                                        </div>
                                        {resume.skills && resume.skills?.length > 0 && (
                                            <div className={'flex justify-center m-2'}>
                                                <Carousel opts={{align: 'start', dragFree: true}} className="w- max-w-md   ">
                                                    <CarouselContent className={'-ml-4'}>
                                                        {resume.skills?.map((skill) => (
                                                            <CarouselItem
                                                                className={`basis-${resume.skills.length === 1 ? 'full' : (resume.skills.length >= 3 ? '1/2' : '1/3')}  hover:opacity-75 text-xl  `}
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
                                                    {resume.skills?.length > 3 &&
                                                        <CarouselNext/>
                                                    }
                                                </Carousel>
                                            </div>
                                        )}
                                        {resume.types_of_employ && resume.types_of_employ?.length > 0 &&
                                            <>
                                                <p className={'self-center'}>Тип занятости:</p>
                                                <div className={'flex justify-center'}>
                                                    {resume.types_of_employ?.map((type, index) => {
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
                                                            {resume.cities?.length > 3 &&
                                                                <CarouselNext/>
                                                            }
                                                        </CarouselItem>
                                                    ))}
                                                </CarouselContent>
                                            </Carousel>
                                        </div>
                                    </div>
                                    <div className={'flex flex-col justify-center items-center relative'}>
                                        {user?.id === resume.user_id &&
                                            <div
                                                className={'flex space-x-2 justify-end self-center top-0 p-2 absolute'}>
                                                <div className={'flex gap-x-4'}>
                                                    <Button className={'rounded-full gap-x-2 '}
                                                            onClick={() => router.push(`${resume.id}/edit`)}>
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
                                                        <DialogContent className={'flex self-justify-center flex-col'} >
                                                            <DialogHeader className={'self-center p-2 text-center'}>
                                                                <DialogTitle >Вы уверены, что хотите удалить резюме?</DialogTitle>
                                                                <DialogDescription className={'font-boldtext-center font-bold text-md text-destructive rounded'}> После подтверждения резюме удалится без возможности восстановления</DialogDescription>
                                                            </DialogHeader>
                                                            <div className={'flex justify-center space-x-4'}>
                                                                <Button size={'lg'} className={'font-bold'} type={"submit"} onClick={() =>deleteResume(resume.id)}>Да, удалить</Button>
                                                                <DialogClose asChild>
                                                                    <Button size={'lg'} className={'flex self-center  font-bold'}>Нет</Button>
                                                                </DialogClose>
                                                            </div>
                                                        </DialogContent>
                                                    </Dialog>
                                                </div>
                                            </div>
                                        }
                                        <Button size={'lg'} type={'button'}
                                                onClick={() => router.push(`${resume.id}`)}>Посмотреть
                                        </Button>
                                        <div className={'absolute bottom-2 text-xs opacity-50'}>
                                            {formattedDate(resume.created_at)}
                                        </div>
                                    </div>
                                </div>
                            )
                        }) :
                        <div
                            className={'flex self-center gap-2 flex-col shadow-lg m-4 p-4 border rounded-2xl w-[700px] m h-96 justify-center'}>
                            <CircleX className={'self-center'} size={64}/>
                            <span className={'self-center text-3xl font-extrabold '}>Резюме не найдены</span>
                            <div className={'mt-2'}>
                                <p className={'text-md opacity-75'}>Ваши резюме ещё не созданы.</p>
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