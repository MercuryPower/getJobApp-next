import React, {useState} from 'react';
import {Button} from "@/components/ui/button";
import {BriefcaseBusiness, UsersRound} from "lucide-react";
import {useIsEmployer} from "@/components/providers";

interface TypeChangerProps {
    setOffTips:(value:boolean) => void;
}
const TypeChanger = ({setOffTips} : TypeChangerProps) => {
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
                        Вакансиям
                    </div>
                )
                :
                (
                    <div className={'flex gap-2'}>
                        <BriefcaseBusiness className={'self-center'} />
                        Соискателям
                    </div>
                )
            }
        </Button>
    );
};

export default TypeChanger;