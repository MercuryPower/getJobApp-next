import React, {useEffect, useState} from 'react';
import {usePathname, useRouter} from "next/navigation";
import {VacancyInfo} from "@/types/types";
import VacancyCardSkeleton from "@/components/ui/skeletons/VacancyCardSkeleton";
import Link from "next/link";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card";
import {Button} from "@/components/ui/button";
import {Carousel, CarouselContent, CarouselItem} from "@/components/ui/carousel";
import {Card, CardContent} from "@/components/ui/card";
import {CircleX} from "lucide-react";

interface ResumeInfo extends VacancyInfo{
    resume: string;
}
const ResumeCards = ({data, page, query, queryString}: {data:ResumeInfo[], page:number, query:string, queryString:string}) => {
    const pathname = usePathname()
    const router = useRouter();
    const [filteredVacancies, setFilteredVacancies] = useState<ResumeInfo[]>(data)
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`http://127.0.0.1:8000/tests/user?page=${page}&query=${query}&${queryString}`);
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
    useEffect(() => {
        if (data && data.length > 0 && query && query.trim() !== '') {
            const filteredData = data.filter((vacancy) => {
                const keywords = query.split(' ').filter(Boolean); // Разбить запрос на отдельные слова и удалить пустые строки
                const vacancyFields = Object.values(vacancy).join(' ').toLowerCase();
                return keywords.some(keyword => vacancyFields.includes(keyword.toLowerCase()));
            });
            setFilteredVacancies(filteredData);
        } else {
            setFilteredVacancies(data);
        }
    }, [data, query]);

    return (
        <>
            {isLoading ? <VacancyCardSkeleton /> : (
                <div className={'text-center '}>
                    {filteredVacancies.length > 0 ? filteredVacancies.map((resume) => {
                        return (
                            <div key={resume.id} className={'flex shadow p-4 m-2 my-6 rounded-2xl  gap-5 border'}>
                                <div className={'p-2  w-[500px] flex flex-col flex-grow rounded'}>
                                    <div className={' flex text-center justify-center p-2'}>
                                        <Link href={`${pathname}/${resume.id}`}>
                                            <p className={'text-3xl text-ellipsis overflow-hidden font-bold  cursor-pointer'}>{resume.exp} {resume.vacancy_name}</p>
                                        </Link>
                                    </div>
                                    {resume.salary_type === 'range' ?
                                        <p className={'text-center text-2xl text-ellipsis overflow-hidden '}>{resume.min_salary} - {resume.max_salary} &#8381; </p>

                                        :
                                        resume.salary_type === 'fixed' ? (
                                            <p className={'text-center text-2xl text-ellipsis overflow-hidden '}>{resume.fixed_salary} &#8381;</p>
                                        ): (
                                            <p className={'text-center text-2xl text-ellipsis overflow-hidden '}>по договоренности </p>
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
                                                    <Button variant="link">{'vacancy.companyName'}</Button>
                                                </HoverCardTrigger>
                                                <HoverCardContent className="w-fit ">
                                                    <div className="flex justify-between space-x-4 self-center " >
                                                        <Avatar className={'self-center'}>
                                                            <AvatarImage
                                                                src="https://acdn.tinkoff.ru/static/pages/files/d39e9d26-fd5e-4574-9ad3-c3f2fc102598.png"/>
                                                            <AvatarFallback>VC</AvatarFallback>
                                                        </Avatar>
                                                        <div className="space-y-2 flex max-w-md flex-col  justify-center self-center ">
                                                            {/*<h4 className="text-sm text-ellipsis overflow-hidden font-semibold">{"vacancy.companyName"}</h4>*/}
                                                            <p className="text-sm max-w-32 text-ellipsis overflow-hidden">
                                                                {`vacancy.descriptionaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`}
                                                            </p>
                                                            <div className="flex flex-col  items-center text-ellipsis  overflow-hidden pt-2">
                                                    <span
                                                        className="text-xs text-muted-foreground ">Joined December 2021</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </HoverCardContent>
                                            </HoverCard>
                                        </p>
                                    </div>
                                    <div className={'flex justify-center'}>
                                        {resume.skills?.map((skill, index) => {
                                            return <p key={skill.name}
                                                      className={'text-ellipsis overflow-hidden m-1 text-xl border font-bold hover:bg-gray-400 p-2 rounded-2xl'}>{skill.name}</p>
                                        })}
                                    </div>
                                    <p>Тип занятости:</p>
                                    <div className={'flex justify-center'}>
                                        {resume.types_of_employ?.map((type, index) => {
                                            return <p key={type.name}
                                                      className={'text-ellipsis rounded-2xl overflow-hidden m-1 hover:bg-gray-400 p-2'}>{type.name}</p>
                                        })}
                                    </div>
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
                                                    </CarouselItem>
                                                ))}
                                            </CarouselContent>
                                        </Carousel>
                                    </div>
                                </div>
                                <div className={'flex self-center flex-col '}>
                                    <Button size={'lg'} type={'button'} onClick={()=> router.push(`${pathname}/${resume.id}`)}>Посмотреть</Button>
                                </div>
                            </div>
                        )
                    }) : <div
                        className={'flex gap-2 flex-col shadow-lg m-4 p-4 border rounded-2xl w-[700px] h-96 justify-center'}>
                        <CircleX className={'self-center'} size={64}/>
                        <span className={'self-center text-3xl '}>Ничего не найдено</span>
                    </div>}

                </div>
            )}
        </>

    );
};

export default ResumeCards;