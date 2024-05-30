import React, {useEffect, useState} from 'react';
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import {Label} from "@/components/ui/label";
import VacancyCards from "@/components/VacancyCards";
import {CircleX} from "lucide-react";
import {VacancyInfo} from "@/types/types";
import {usePathname, useRouter} from "next/navigation";

const RecommendationSection = () => {
    const [recommendationData, setRecommendationData] = useState<VacancyInfo[]>([])
    const [isLoading, setIsLoading] = useState(false);
    const pathname = usePathname()
    const router = useRouter();
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`http://127.0.0.1:8000/tests/company?page=1`);

                const responseData = await response.json();
                setRecommendationData(responseData.slice(0, 3));
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        void fetchData();
    }, []);

    return (
        <div className="flex justify-center mt-4">
            <Carousel className="w-1/2">
                <Label className={'font-extralight text-xl flex justify-center'}>Рекомендуемые вакансии для вас:</Label>
                <CarouselContent>
                    <CarouselItem>
                        <div className="flex justify-center gap-4">
                            {recommendationData.length > 0 ? recommendationData.map((vacancy) => (
                                <VacancyCards key={vacancy.id} data={[vacancy]}/>
                            )) : (
                                <div
                                    className="flex gap-2 flex-col shadow-lg m-4 p-4 border rounded-2xl w-[700px] h-96 justify-center">
                                    <CircleX className="self-center" size={64}/>
                                    <span className="self-center text-3xl">Ничего не найдено</span>
                                </div>
                            )}
                        </div>
                    </CarouselItem>
                </CarouselContent>
                <CarouselPrevious/>
                <CarouselNext/>
            </Carousel>
        </div>
    );
};

export default RecommendationSection;