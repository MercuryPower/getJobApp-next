'use client'
import React, {useEffect, useState} from 'react';
import {useAuth} from "@/providers";
import notFound from "@/app/not-found";
import VacancyCardSkeleton from "@/components/ui/skeletons/VacancyCardSkeleton";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card";
import {formattedDate} from "@/hooks/formatDate";
import {Carousel, CarouselContent, CarouselItem, CarouselNext} from "@/components/ui/carousel";
import {Card, CardContent} from "@/components/ui/card";
import {Check, CircleX, MoveDown, Pencil, Search, SearchCheck, Trash2} from "lucide-react";
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {useParams, usePathname, useRouter} from "next/navigation";
import {VacancyInfo} from "@/types/types";
import {Separator} from "@/components/ui/separator";

const Page = () => {
    const {user} = useAuth()
    const router = useRouter();
    const params = useParams();
    const pathname = usePathname()
    const [complaints, setComplaints] = useState<VacancyInfo[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchComplaints = async () => {
            setIsLoading(true)
            try {
                const response = await fetch(`http://127.0.0.1:8000/tests/reported_vacancies`,{
                    method:'GET',
                    headers:{
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch vacancy');
                }
                const data = await response.json();
                setComplaints(data);
            } catch (error) {
                console.error('Ошибка при сборе данных:', error);
            } finally {
                setIsLoading(false)
            }
        };

        void fetchComplaints();
    }, []);
    console.log(complaints)
    const deleteVacancy = async (complaintId: number) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/tests/delete_vacancy/${complaintId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            if (!response.ok) {
                throw new Error('Failed to delete vacancy');
            }
            setComplaints(prevComplaints => prevComplaints.filter(complaint => complaint.id !== complaintId));
        } catch (error) {
            console.error('Ошибка при удалении вакансии:', error);
        }
    };
    const declineComplaint = async (complaintId: number) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/tests/decline_report/${complaintId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            if (!response.ok) {
                throw new Error('Ошибка при отмене жалобы');
            }
            setComplaints(prevComplaints => prevComplaints.filter(complaint => complaint.id !== complaintId));
        } catch (error) {
            console.error('Ошибка при удалении вакансии:', error);
        }
    };
    if (!user?.is_superuser) {
        return notFound();
    }
    return (
        <>
            <div className={'flex justify-center'}>
                <h1 className={'text-3xl font-extrabold mt-4 p-2  rounded-2xl'}>Жалобы</h1>
            </div>
            {isLoading ? (
                <div className={'flex justify-center self-center'}>
                    <VacancyCardSkeleton/>
                </div>
            ) : (
                <div className={'text-center flex-col flex justify-center '}>
                    {complaints && complaints.length > 0 ? complaints.map((vacancy) => {
                            return (
                                <React.Fragment key={vacancy.id}>
                                    <div key={vacancy.id}
                                         className={'flex justify-center self-center shadow p-4 m-2 mt-6  rounded-2xl  gap-5 border min-h-80'}>
                                        <div className={'p-2  w-[500px]  flex flex-col flex-grow rounded'}>
                                            <div className={' flex text-center justify-center p-2'}>
                                                <Link href={`${vacancy.type === 'company' ? `/vacancies/` : `/jobseekers/`}${vacancy.id}`}>
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
                                            {user?.id === vacancy.user_id || user?.is_superuser &&
                                                <div className={'flex space-x-2 justify-end self-center top-4 absolute'}>
                                                    <div className={'flex gap-x-4'}>
                                                        <Button className={'rounded-full gap-x-2 '}
                                                                onClick={() => router.push(`${vacancy.type === 'company' ? `/vacancies/` : `/jobseekers/`}${vacancy.id}/edit`)}>
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
                                                    <div className={'flex gap-x-4'}>
                                                        <Dialog>
                                                            <DialogTrigger asChild>
                                                                <Button className={'rounded-full gap-x-2 '} variant={'ghost'}>
                                                                    <CircleX size={24}  />
                                                                </Button>
                                                            </DialogTrigger>
                                                            <DialogContent className={'flex self-justify-center flex-col ' } >
                                                                <DialogHeader className={'self-center p-2 text-center'}>
                                                                    <DialogTitle >Вы уверены, что хотите закрыть жалобу?</DialogTitle>
                                                                    <DialogDescription className={'font-boldtext-center font-bold text-md rounded'}> После подтверждения жалоба будет закрыта. </DialogDescription>
                                                                </DialogHeader>
                                                                <div className={'flex justify-center space-x-4 '}>
                                                                    <Button size={'lg'} className={'font-bold bg-green-600 '} type={"submit"} onClick={() =>declineComplaint(vacancy.id)}><Check /> Да, закрыть жалобу</Button>
                                                                    <DialogClose asChild>
                                                                        <Button size={'lg'} className={'flex self-center font-bold '}>Нет</Button>
                                                                    </DialogClose>
                                                                </div>
                                                            </DialogContent>
                                                        </Dialog>

                                                    </div>
                                                </div>
                                            }
                                            <Button size={'lg'} type={'button'}
                                                    onClick={() => router.push(`${vacancy.type === 'company' ? `/vacancies/` : `/jobseekers/`}${vacancy.id}`)}>Посмотреть
                                            </Button>
                                            <div className={'absolute bottom-2 text-xs opacity-50'}>
                                                <p>Создано</p>
                                                <p>{formattedDate(vacancy.created_at)}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <MoveDown  size={48} className={'self-center text-muted-foreground'} />
                                    {vacancy.reports?.map((report) => (
                                    <div key={report.id} className={'flex mt-3 flex-col  self-center shadow border-destructive  rounded-2xl border min-h-40 min-w-[600px]'}>
                                        <div className={'flex flex-col space-x-2 justify-center'}>
                                            <h2 className={'text-2xl mt-2 '}>Жалоба от {report.report_username}</h2>
                                            <h3 className={'text-md font-light self-center text-muted-foreground'}>{report.report_username !== 'Аноним' &&`(UserID:${report.report_user_id})`} (ReportID:{report.id})</h3>
                                        </div>
                                        <h2 className={'text-xl text-center self-center'}><span className={'bg-accent rounded'}>{report.report_type}</span> - {report.report_description}</h2>
                                    </div>
                                    ))}
                                </React.Fragment>
                            )
                        }) :
                        <div
                            className={'flex self-center gap-2 flex-col shadow-lg m-4 p-4 border rounded-2xl w-[700px] m h-96 justify-center'}>
                            <SearchCheck color="#16a34a" className={'self-center'} size={64}/>
                            <span className={'self-center text-3xl font-extrabold '}>Жалобы отсутствуют</span>
                            <span className={'self-center text-xl bg-accent rounded-xl p-2 '}>Если жалобы не появляются то попробуйте обновить страницу</span>
                        </div>
                    }
                </div>
            )}
        </>
    );
};

export default Page;