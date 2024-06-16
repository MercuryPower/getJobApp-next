import React, {useEffect, useState} from 'react';
import {usePathname, useRouter} from "next/navigation";
import {VacancyInfo} from "@/types/types";
import VacancyCardSkeleton from "@/components/ui/skeletons/VacancyCardSkeleton";
import Link from "next/link";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card";
import {Button} from "@/components/ui/button";
import {Carousel, CarouselContent, CarouselItem, CarouselNext} from "@/components/ui/carousel";
import {Card, CardContent} from "@/components/ui/card";
import {BadgeCheck, CircleX, Flag, Pencil, ShieldAlert, Trash2} from "lucide-react";
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
import style from "@/components/styles/style.module.sass";
import ComplaintsForm from "@/components/forms/ComplaintsForm";

interface ResumeInfo extends VacancyInfo{
    resume: string;
}
const ResumeCards = ({data, page, query, queryString}: {data:ResumeInfo[], page:number, query:string, queryString:string}) => {
    const [hoveredResumeId, setHoveredResumeId] = useState<number | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const pathname = usePathname()
    const {user} = useAuth()
    const router = useRouter();
    const [filteredResumes, setFilteredResumes] = useState<ResumeInfo[]>(data)
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`http://127.0.0.1:8000/tests/user?page=${page}&query=${query}&${queryString}`);
                const responseData = await response.json();
                setFilteredResumes(responseData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        void fetchData();
    }, [page, query, queryString]);

    useEffect(() => {
        if (data && data.length > 0 && query && query.trim() !== '') {
            const filteredData = data.filter((resume) => {
                const keywords = query.split(' ').filter(Boolean); // Разбить запрос на отдельные слова и удалить пустые строки
                const resumeFields = Object.values(resume).join(' ').toLowerCase();
                return keywords.some(keyword => resumeFields.includes(keyword.toLowerCase()));
            });
            setFilteredResumes(filteredData);
        } else {
            setFilteredResumes(data);
        }
    }, [data, query]);
    const deleteResume = async (resumeId: number) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/tests/delete_vacancy/${resumeId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            if (!response.ok) {
                throw new Error('Failed to delete vacancy');
            }
            setFilteredResumes(prevResumes => prevResumes.filter(resume => resume.id !== resumeId));
        } catch (error) {
            console.error('Ошибка при удалении вакансии:', error);
        }
    };


    const handleMouseEnter = (resumeId: number) => {
        setHoveredResumeId(resumeId);
    };

    const handleMouseLeave = () => {
        if(!isDialogOpen){
            setHoveredResumeId(null);
        }
    };

    return (
        <>
            {isLoading ? <VacancyCardSkeleton/> : (
                <div className={'text-center '}>
                    {filteredResumes && filteredResumes.length > 0 ? filteredResumes.map((resume) => {
                            return (
                                <div key={resume.id} className={'flex shadow p-4 m-2 my-6 rounded-2xl gap-5 border min-h-80'}
                                     onMouseEnter={() => handleMouseEnter(resume.id)}
                                     onMouseLeave={handleMouseLeave}
                                >
                                    <div className={'p-2  w-[500px] flex flex-col flex-grow  justify-center rounded relative'}>
                                        <div className={' flex text-center justify-center p-2'}>
                                            {hoveredResumeId === resume.id &&
                                                <ComplaintsForm report_user_id={user?.id} setHoveredId={setHoveredResumeId} setIsDialogOpen={setIsDialogOpen} vacancy_id={resume.id} report_username={user?.username}/>
                                            }
                                            <Link href={`${pathname}/${resume.id}`}>
                                                <p className={'text-3xl text-ellipsis overflow-hidden font-bold  cursor-pointer'}>{resume.exp} {resume.vacancy_name}</p>
                                            </Link>
                                        </div>
                                        {resume.salary_type === 'range' ?
                                            <p className={'text-center text-2xl font-light text-ellipsis overflow-hidden '}>{resume.min_salary} - {resume.max_salary} &#8381; </p>

                                            :
                                            resume.salary_type === 'fixed' ? (
                                                <p className={'text-center text-2xl font-light text-ellipsis overflow-hidden '}>{resume.fixed_salary} &#8381;</p>
                                            ): (
                                                <p className={'text-center text-2xl  font-lighttext-ellipsis overflow-hidden '}>по договоренности </p>
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
                                                            <p className="text-xs text-start max-w-64 max-h-20 text-ellipsis overflow-hidden">
                                                                {resume.companyDescription}
                                                            </p>
                                                            <div className="flex flex-col  items-center text-ellipsis  overflow-hidden pt-2">
                                                                <span className="text-xs text-muted-foreground ">Присоединился в {formattedDate(resume.registered_at, true)}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </HoverCardContent>
                                            </HoverCard>
                                        </div>
                                        {resume.skills && resume.skills?.length > 0 && (
                                            <div className={'flex justify-center m-2'}>
                                                <Carousel opts={{align: 'start', dragFree: true}} className="w-96 max-w-xs justify-items-center   ">
                                                    <CarouselContent  className={'-ml-4'}>
                                                        {resume.skills?.map((skill) => (
                                                            <CarouselItem
                                                                className={`basis-${resume.skills.length === 1 ? 'full' : (resume.skills.length >= 2 ? '1/2' : '1/3')}  hover:opacity-75 pl-4 `}
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
                                                    {resume.skills?.length >= 3 &&
                                                        <CarouselNext/>
                                                    }
                                                </Carousel>
                                            </div>
                                        )}
                                        {resume.types_of_employ && resume.types_of_employ?.length > 0 &&
                                            <>
                                                <p>Тип занятости:</p>
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
                                            <Carousel opts={{align: 'start', dragFree: true,}} className="max-w-md ">
                                                <CarouselContent className={'-ml-4'}>
                                                    {resume.cities?.map((city) => (
                                                        <CarouselItem
                                                            className={`basis-${resume.cities.length === 1 ? 'full' : (resume.cities.length >= 2 ? '1/2' : '1/3')}  hover:opacity-75 pl-4 `}
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
                                        {user?.id === resume.user_id &&
                                            <div className={'flex space-x-2 justify-end self-center top-0 p-2 absolute'}>
                                                <div className={'flex gap-x-4'}>
                                                    <Button className={'rounded-full gap-x-2 '}
                                                            onClick={() => router.push(`${pathname}/${resume.id}/edit`)}>
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
                                                                <Button size={'lg'} className={'font-bold bg-destructive dark:text-white hover:text-inherit hover:bg-destructive dark:hover:bg-destructive dark:hover:text-black'} type={"submit"} onClick={() =>deleteResume(resume.id)}>Да, удалить</Button>
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
                                                onClick={() => router.push(`${pathname}/${resume.id}`)}>Посмотреть
                                        </Button>
                                        <div className={'absolute bottom-2 text-xs opacity-50'}>
                                            <p>Создано</p>
                                            <p>{formattedDate(resume.created_at)}</p>
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

export default ResumeCards;