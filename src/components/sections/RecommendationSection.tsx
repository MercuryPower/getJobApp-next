import React, {useEffect, useState} from 'react';
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from "@/components/ui/carousel";
import {Label} from "@/components/ui/label";
import VacancyCards from "@/entities/cards/VacancyCards";
import {CircleX} from "lucide-react";
import {VacancyInfo} from "@/types/types";
import {usePathname, useRouter} from "next/navigation";
import RecommendationCards from "@/entities/cards/RecommendationCards";
import {Separator} from "@/components/ui/separator";
import {useAuth} from "@/providers";
import {GET_RECOMMENDATIONS} from "@/url/urls";

const RecommendationSection = () => {
    const [recommendationData, setRecommendationData] = useState<VacancyInfo[]>([])
    const [isLoading, setIsLoading] = useState(false);
    const [isHovered, setIsHovered] = useState(false)
    const pathname = usePathname()
    const {user} = useAuth()
    const router = useRouter();
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(GET_RECOMMENDATIONS, {
                    method:'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                const responseData = await response.json();
                setRecommendationData(responseData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        void fetchData();
    }, []);

    const [api, setApi] = React.useState<CarouselApi>()
    const [current, setCurrent] = React.useState(0)
    React.useEffect(() => {
        if (!api) {
            return
        }

        setCurrent(api.selectedScrollSnap() + 1)

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1)
        })
    }, [api])

    return (
        <div className="flex flex-col justify-center mt-4">
            <Label className="font-extralight text-xl flex justify-center">Рекомендуемые вакансии для вас:</Label>
            <Carousel setApi={setApi} className={"w-full max-w-4xl "} opts={{ align: 'start', dragFree: true, watchDrag: !isHovered }}>
                <CarouselContent>
                    {recommendationData.length > 0 ? (
                        recommendationData.map((vacancy) => (
                            <CarouselItem key={vacancy.id} >
                                <RecommendationCards setIsHovered={setIsHovered} data={[vacancy]} />
                            </CarouselItem>
                        ))
                    ) : (
                        <CarouselItem>
                            <div className="flex self-center gap-2 flex-col shadow-lg m-4 p-4 border rounded-2xl w-[700px] m h-96 justify-center">
                                <CircleX className="self-center" size={64} />
                                <h3 className="self-center font-extrabold text-3xl">Рекомендаций не найдено</h3>
                                <h3 className="self-center text-base font-light text-muted-foreground">К сожалению, мы не смогли определить ваши текущие рекомендации</h3>
                                <Separator  className={'w-1/2 self-center'}/>
                                {user?.type === 'company' ?
                                    <h3 className="self-cente text-center font-light text-muted-foreground text-base "><span className={'font-bold'}>Попробуйте создать больше вакансий</span> <br /> чтобы мы могли <span className={'font-bold italic'}>точно</span> подобрать подходящих сотрудников</h3>
                                    :
                                    <h3 className="self-cente text-center font-light text-muted-foreground text-base "><span className={'font-bold'}>Попробуйте создать или добавить больше информации в вашем резюме</span> <br /> чтобы мы могли <span className={'font-bold italic'}>точно</span> подобрать подходящего работодателя</h3>

                                }
                            </div>
                        </CarouselItem>
                    )}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext  />
                {recommendationData.length > 0 &&
                    <div className="py-2 text-center text-sm text-muted-foreground">
                        Представлено {current} рекомендаций  из {recommendationData.length}
                    </div>
                }

            </Carousel>
        </div>
    );
};

export default RecommendationSection;