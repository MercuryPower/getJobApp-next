'use client'
import React, {useEffect, useState} from 'react';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Button} from "@/components/ui/button";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import VacancyCards from "@/components/VacancyCards";
import {VacancyInfo} from "@/types/types";
import Link from "next/link";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card";
import {formattedDate} from "@/hooks/formatDate";
import {CircleX, Lightbulb} from "lucide-react";
import {usePathname, useRouter} from "next/navigation";
import {Separator} from "@/components/ui/separator";
import RecommendationSection from "@/components/sections/RecommendationSection";
import {useAuth} from "@/providers";
import LoginSection from "@/components/sections/LoginSection";

const Page = () => {
    const {isLoggedIn} = useAuth()
    return (
        <div className="flex flex-col items-center overflow-hidden">
            <h1 className="text-3xl font-extrabold mt-4 p-2 rounded-2xl">Рекомендации</h1>
            <Separator className={'w-1/6 mt-2'} />
            {isLoggedIn ?
                <RecommendationSection />
                :
                <div
                    className={'flex text-center self-center gap-2 flex-col shadow-lg m-4 p-4 border rounded-2xl w-[700px] m h-96 justify-center'}>
                    <div className={'flex justify-center self-center p-2 bg-green-600 shadow-lg rounded-full'}>
                        <Lightbulb className={'self-center dark:invert '} color={'white'} size={64}/>
                    </div>
                    <span className={'self-center text-3xl font-extrabold '}>Чтобы увидеть рекомендации необходимо <br/> войти в аккаунт.</span>
                    <div className={'flex  justify-center mt-2'}>
                        <LoginSection />
                    </div>
                </div>
            }

        </div>
    );
};

export default Page;