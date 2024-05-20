'use client'
import React from 'react';
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card";
import {Button} from "@/components/ui/button";
import {useParams} from "next/navigation";

const Page = () => {
    const params = useParams();
    return (
        <div className={'flex justify-center text-4xl mt-12'}>
            <h1>52{params.id}</h1>
        </div>
    );
};

export default Page;