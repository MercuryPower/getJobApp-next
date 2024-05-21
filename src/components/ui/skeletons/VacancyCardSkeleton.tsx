import React from 'react';
import {Carousel, CarouselContent, CarouselItem} from "@/components/ui/carousel";
import {Card, CardContent} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Skeleton} from "@/components/ui/skeleton";

const VacancyCardSkeleton = ({ items = [1, 2, 3] }: { items?: number[] } ) => {

    return (
        <div className={'text-center '}>
                {items.map((index) => {
                    return (
                        <div key={index}  className={'flex shadow p-4 m-2 my-6 rounded  gap-5 border'}>
                            <div  className={'p-2 w-screen max-w-lg flex flex-col flex-grow rounded'} >
                                <div className={'flex justify-center p-2 flex-col space-y-4'}>
                                    <Skeleton className="w-96 bg-gray-200 dark:bg-muted h-10 self-center text-xl border font-bold  p-2 rounded-2xl " />
                                    <Skeleton className="w-48 bg-gray-200 dark:bg-muted h-6 self-center  p-2 rounded-2xl" />
                                    <Skeleton className="w-32 bg-gray-200 dark:bg-muted self-center h-6 p-2 rounded-2xl" />
                                </div>
                                <div className={'flex justify-center w-full overflow-x-auto p-2  space-x-4'}>
                                    <Skeleton className="max-w-xs rounded-2xl bg-gray-200 dark:bg-muted  h-8 w-24" />
                                    <Skeleton className="max-w-xs rounded-2xl bg-gray-200 dark:bg-muted h-8 w-24" />
                                </div>
                                <div className={'flex justify-center w-full overflow-x-auto p-2  space-x-4'}>
                                    <Skeleton className=" w-32 h-6 self-center bg-gray-200 dark:bg-muted p-2 rounded-2xl" />
                                    <Skeleton className=" w-32 h-6 self-center bg-gray-200 dark:bg-muted  p-2 rounded-2xl" />
                                </div>
                                <div className={'flex justify-center w-full overflow-x-auto p-2  space-x-4'}>
                                    <Skeleton className="max-w-xs rounded-2xl bg-gray-200 dark:bg-muted h-10 w-24 " />
                                </div>
                            </div>
                            <div className={'flex self-center flex-col '}>
                                <Skeleton className="w-36 h-11 rounded-md px-8 dark:bg-gray-200 bg-black" />
                            </div>
                        </div>
                    )
                })}
            </div>

    );
};

export default VacancyCardSkeleton;