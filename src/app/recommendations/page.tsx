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
import {CircleX} from "lucide-react";
import {usePathname, useRouter} from "next/navigation";
import {Separator} from "@/components/ui/separator";
import RecommendationSection from "@/components/sections/RecommendationSection";

const Page = () => {

    return (
        <div className="flex flex-col items-center overflow-hidden">
            <h1 className="text-3xl font-extrabold mt-4 p-2 rounded-2xl">Рекомендации</h1>
            <Separator className={'w-1/6 mt-2'} />
            <RecommendationSection />
        </div>
    );
};

export default Page;