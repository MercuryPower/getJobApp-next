import React from 'react';
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {useIsEmployer} from "@/components/providers";

const JobSeekerForm = () => {
    const router = useRouter()
    return (
        <form className={'flex flex-grow flex-col self-center min-w-4 w-[500px] h-[400px] justify-center m-6 shadow rounded border p-4'}>
            <div className={'flex self-center flex-col justify-center text-2xl font-bold'}>
                <p className={'text-center text-lg font-extralight  flex justify-center m-12'}>Отлично! Теперь вы можете создать резюме </p>
                <Button size={'lg'} type={'button'} onClick={() => router.push('/jobseekers/create')}
                        className={'transition-all shadow p-6 h-16 rounded bg-green-600 '}>Создать резюме</Button>
            </div>
        </form>
    );
};

export default JobSeekerForm;