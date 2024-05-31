import React from 'react';
import {Button} from "@/components/ui/button";
import {BriefcaseBusiness, UsersRound} from "lucide-react";
import {useIsEmployer} from "@/components/providers";

const TypeChanger = () => {
    const {isEmployer, setIsEmployer} = useIsEmployer()
    return (
        <Button className={'self-center text-2xl flex-grow font-extrabold mt-4 p-2  rounded-2xl'} onClick={() => setIsEmployer((prev) => !prev)}>
            {isEmployer ?
                (
                    <div className={'flex gap-2'}>
                        <UsersRound className={'self-center'} />
                        Вакансии
                    </div>
                )
                :
                (
                    <div className={'flex gap-2'}>
                        <BriefcaseBusiness className={'self-center'} />
                        Соискатели
                    </div>
                )
            }
        </Button>
    );
};

export default TypeChanger;