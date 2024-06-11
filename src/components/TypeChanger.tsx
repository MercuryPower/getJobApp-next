import React, {useState} from 'react';
import {Button} from "@/components/ui/button";
import {BriefcaseBusiness, UsersRound} from "lucide-react";
import {useIsEmployer} from "@/providers";

interface TypeChangerProps {
    setOffTips:(value:boolean) => void;
    inMainPage?:boolean;
}
const TypeChanger = ({setOffTips, inMainPage} : TypeChangerProps) => {
    const {isEmployer, setIsEmployer} = useIsEmployer()

    const handleClick = () => {
        setOffTips(false)
        setIsEmployer((prev) => !prev)
    }
    return (
        <Button className={'self-center text-2xl flex-grow mt-4 flex justify-center font-extrabold p-2  rounded-2xl'} onClick={handleClick}>
            {isEmployer ?
                (
                    <div className={'flex gap-2'}>
                        <UsersRound className={'self-center'} />
                        {inMainPage ? `Вакансии` : `Вакансиям`}
                    </div>
                )
                :
                (
                    <div className={'flex gap-2'}>
                        <BriefcaseBusiness className={'self-center'} />
                        {inMainPage ? `Соискатели` : `Соискателям`}
                    </div>
                )
            }
        </Button>
    );
};

export default TypeChanger;