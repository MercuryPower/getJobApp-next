'use client'
import React, {useEffect, useState} from 'react';
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card";
import {Button} from "@/components/ui/button";
import {useParams, usePathname, useRouter} from "next/navigation";
import {ResumeInfo, VacancyInfo} from "@/types/types";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Link from "next/link";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import {Card, CardContent} from "@/components/ui/card";
import {useAuth} from "@/providers";
import {formattedDate} from "@/hooks/formatDate";
import {Pencil, Trash2} from "lucide-react";
import {Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import ComplaintsForm from "@/components/forms/ComplaintsForm";
import {DELETE_VACANCY} from "@/url/urls";

const Page = () => {
    const [hoveredResumeId, setHoveredResumeId] = useState<number | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const pathname = usePathname()
    const {user} = useAuth()
    const router = useRouter()
    const params = useParams();
    const [resume, setResume] = useState<ResumeInfo>();
    // useEffect(() => {
    //     const fetchResume = async () => {
    //         try {
    //             const response = await fetch(`http://127.0.0.1:8000/search/vacancy/${params.resume}`);
    //             if (!response.ok) {
    //                 console.error('Ошибка при сборе данных о резюме:');
    //             }
    //             const data = await response.json();
    //             setResume(data);
    //         } catch (error) {
    //             console.error('Ошибка при сборе данных:', error);
    //         }
    //     };
    //     void fetchResume();
    // }, [params.resume]);
    useEffect(() => {
        if (params?.resume) {
            const fetchResume = async () => {
                try {
                    const response = await fetch(`http://127.0.0.1:8000/search/vacancy/${params.resume}`);
                    if (!response.ok) {
                        throw new Error('Ошибка при сборе данных о резюме');
                    }
                    const data = await response.json();

                    if (data.is_reported && user?.is_superuser) {
                        const reportedResponse = await fetch(`http://127.0.0.1:8000/admin/reported_vacancy/${params.resume}`, {
                            headers: {
                                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                            },
                        });
                        if (!reportedResponse.ok) {
                            throw new Error('Ошибка при сборе данных о репортед вакансии');
                        }
                        const reportedData = await reportedResponse.json();
                        setResume(reportedData);
                    } else {
                        setResume(data);
                    }
                } catch (error) {
                    console.error('Ошибка при сборе данных:', error);
                }
            };
            void fetchResume();
        }
        }, [params?.resume, user]);

    const deleteResume = async (vacancyId: number) => {
        try {
            const response = await fetch(`${DELETE_VACANCY}/${vacancyId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            if (!response.ok) {
                throw new Error('Failed to delete vacancy');
            }
            router.replace(`/jobseekers`)
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
            {resume ?
                (
                    <div className={'flex text-start  justify-center text-2xl  mt-12 '}>
                        <Button onClick={() => router.back()} className={'self-start mt-8 space-x-2 hover:no-underline hover:opacity-75 transition-all'} type={'button'}
                                variant={'link'}>
                            <svg width="25" height="25" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M6.85355 3.85355C7.04882 3.65829 7.04882 3.34171 6.85355 3.14645C6.65829 2.95118 6.34171 2.95118 6.14645 3.14645L2.14645 7.14645C1.95118 7.34171 1.95118 7.65829 2.14645 7.85355L6.14645 11.8536C6.34171 12.0488 6.65829 12.0488 6.85355 11.8536C7.04882 11.6583 7.04882 11.3417 6.85355 11.1464L3.20711 7.5L6.85355 3.85355ZM12.8536 3.85355C13.0488 3.65829 13.0488 3.34171 12.8536 3.14645C12.6583 2.95118 12.3417 2.95118 12.1464 3.14645L8.14645 7.14645C7.95118 7.34171 7.95118 7.65829 8.14645 7.85355L12.1464 11.8536C12.3417 12.0488 12.6583 12.0488 12.8536 11.8536C13.0488 11.6583 13.0488 11.3417 12.8536 11.1464L9.20711 7.5L12.8536 3.85355Z"
                                    fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                            </svg>
                            <span>
                        Назад
                    </span>
                        </Button>
                        <div className={'p-2  w-[1000px] flex flex-col rounded border'}
                             onMouseEnter={() => handleMouseEnter(resume.id)}
                             onMouseLeave={handleMouseLeave}>
                            <div className={' flex text-center justify-center gap-x-8  p-2 mt-4 relative  '}>
                                <div>
                                    <div>
                                        <div className={'flex justify-center '}>
                                            <Avatar  className={'self-center cursor-pointer w-40 h-40'}>
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
                                        </div>
                                        <div className={'flex justify-center p-2'}>
                                            <HoverCard>
                                                <HoverCardTrigger asChild>
                                                    <Button  variant="link" className={'font-extrabold text-2xl opacity-80'}>@{resume.companyName}</Button>
                                                </HoverCardTrigger>
                                                <HoverCardContent className='w-fit'>
                                                    <div className="flex justify-between space-x-4 max-w-md " >
                                                        <Avatar  className={'self-center cursor-pointer w-16 h-16'}>
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
                                                        <div className="space-y-2  flex flex-col  justify-center self-center text-wrap ">
                                                            <p className="text-xl  text-start font-extrabold  text-ellipsis overflow-hidden">@{resume.companyName}</p>
                                                            <p className="text-lg text-start   text-ellipsis overflow-hidden">
                                                                {resume.companyDescription}
                                                            </p>
                                                            <div className="flex text-center justify-center flex-col  items-center text-ellipsis  overflow-hidden pt-2">
                                                                <p className="text-lg text-center text-muted-foreground ">
                                                                    Присоединился {formattedDate(resume.registered_at, false)}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </HoverCardContent>
                                            </HoverCard>
                                        </div>
                                    </div>
                                    <div className={'flex'}>
                                        {hoveredResumeId === resume.id &&
                                            <div className={'flex justify-center self-center'}>
                                                <ComplaintsForm  isFull report_user_id={user?.id} setHoveredId={setHoveredResumeId} setIsDialogOpen={setIsDialogOpen} vacancy_id={resume.id} report_username={user?.username}/>
                                            </div>
                                        }
                                        <Link href={`${resume.id}`}>
                                            <p className={'text-5xl justify-center flex text-center  text-ellipsis overflow-hidden font-bold  cursor-pointer'}>{resume.exp} {resume.vacancy_name}</p>
                                        </Link>
                                        {user?.id === resume.user_id || user?.is_superuser &&
                                            <div className={'flex space-x-2 ml-2 justify-end self-center relative'}>
                                                <div className={'flex gap-x-4'}>
                                                    <Button className={'rounded-full gap-x-2 '}
                                                            onClick={() => router.push(`${pathname}/edit`)}>
                                                        <Pencil />
                                                    </Button>
                                                </div>
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button className={'bg-destructive  rounded-full gap-x-2'}>
                                                            <Trash2 />
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent className={'flex self-justify-center flex-col'} >
                                                        <DialogHeader className={'self-center'}>
                                                            <DialogTitle >Вы уверены, что хотите удалить резюме?</DialogTitle>
                                                        </DialogHeader>
                                                        <div className={'flex justify-center space-x-4'}>
                                                            <Button size={'lg'} className={'font-bold'}  onClick={() =>deleteResume(resume.id)}>Да, удалить</Button>
                                                            <DialogClose asChild>
                                                                <Button size={'lg'} className={'flex self-center  bg-green-600  font-bold'}>Нет</Button>
                                                            </DialogClose>
                                                        </div>
                                                    </DialogContent>
                                                </Dialog>
                                            </div>
                                        }
                                    </div>
                                </div>
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
                                                            <CardContent className="m-1  p-2">
                                                                <span className="font-black">{skill.name}</span>
                                                            </CardContent>
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
                            {resume.cities && resume.cities.length > 0 &&
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
                                {resume.companyDescription !== null &&
                                    <>
                                        <h2 className={'font-extrabold'}>Обо мне:</h2>
                                        <p  className={'text-start'}>{resume.companyDescription}</p>
                                    </>
                                }
                            </div>
                            <div className={'p-2 m-4 space-y-4'}>
                                <h2 className={'font-black'}>Описание вакансии:</h2>
                                <p className={'text-start'}>{resume.description}</p>
                            </div>
                            <div className={'p-2 m-4 space-y-4'}>
                                <h2 className={'font-black'}>Контакты:</h2>
                                <p className={'text-start'}>{resume.contacts}</p>
                                <p className={'text-xs opacity-50'}>Вы можете связаться с соискателем по
                                    этим контактам</p>
                            </div>
                            {user?.is_superuser &&
                                resume.reports?.map((report) => (
                                    <div key={report.id} className={'flex mt-3 flex-col  self-center shadow border-destructive gap-y-2 rounded-2xl border min-h-40 min-w-full p-2'}>
                                        <div className={'flex flex-col space-x-2 justify-center'}>
                                            <h2 className={'text-3xl mt-2 bg-destructive self-center rounded p-2 m-2 text-white flex justify-center font-bold'}>Жалоба от {report.report_username}</h2>
                                            <h3 className={'text-xl font-light self-center text-muted-foreground'}>{report.report_username !== 'Аноним' &&`(UserID:${report.report_user_id})`} (ReportID:{report.id})</h3>
                                        </div>
                                        <h2 className={'text-2xl text-center font-bold self-center bg-accent rounded'}>{report.report_type}</h2>
                                        <h2 className={'text-xl text-center self-center rounded'}>{report.report_description}</h2>
                                    </div>
                            ))}
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