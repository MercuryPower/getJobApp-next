import React from 'react';
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {useIsEmployer} from "@/providers";
import {BookCheck} from "lucide-react";
import {Separator} from "@/components/ui/separator";

const JobSeekerForm = () => {
    const router = useRouter()
    return (
        <div className={'flex text-center self-center gap-2 flex-col shadow-lg m-4 p-4 border rounded-2xl w-[700px] m h-96 justify-center space-y-12'}>
            <div className={'self-center text-3xl font-extrabold text-center'}>
                <div className={'flex justify-center self-center p-2 space-x-2'}>
                    <BookCheck className={'self-center'} size={64} />
                    <p className={'text-center text-2xl font-black self-center'}>Отлично! </p>
                </div>
                <p className={'text-center text-2xl font-extra  flex justify-center'}> Теперь вы можете создавать резюме.</p>
                <div className={'flex flex-col space-y-4'}>
                    <Button size={'lg'} type={'button'} onClick={() => router.push('/jobseekers/create')}
                            className={'transition-all w-3/4 rounded-xl shadow self-center p-2 h-16 bg-green-600 mt-4 text-2xl '}>Создать резюме
                    </Button>
                    <Button className={'transition-all w-1/2 shadow rounded-xl p-2 self-center h-16  mt-6 text-xl'}
                            onClick={() => router.replace('/jobseekers/me')}>Мои резюме</Button>
                </div>
            </div>
        </div>
    );
};

export default JobSeekerForm;