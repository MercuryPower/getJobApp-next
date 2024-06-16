'use client'
import React, {useEffect, useState} from 'react';
import {useParams, usePathname, useRouter} from "next/navigation";
import {useAuth} from "@/providers";
import {VacancyInfo} from "@/types/types";
import notFound from "@/app/not-found";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {Container} from "@mui/material";
import {toast, useToast} from "@/components/ui/use-toast";
import {ToastAction} from "@/components/ui/toast";
import {BadgeAlert, Check, Mail, MailPlus, Paperclip} from "lucide-react";
import FormSuccess from "@/components/forms/form-success";
import {
    ADD_PHOTO,
    GET_VERIFICATIONS_SKILLS,
    SET_VERIFICATION_COMPANY_NAME,
    SET_VERIFICATION_REQUEST_COMPANY_NAME
} from "@/url/urls";
import {Input} from "@/components/ui/input";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";
import {FormProvider, useForm} from "react-hook-form";
import {z} from "zod";
import {LoginSchema, ProfileSchema} from "@/schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";

const Page = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [isVerificationRequestSend, setIsVerificationRequestSend] = useState(false);
    // const [isVerificationRequestSend, setIsVerificationRequestSend] = useState(() => {
    //     return localStorage.getItem('isVerificationRequestSend') === 'true';
    // })
    const pathname = usePathname();
    const { toast } = useToast()
    const {user, isLoggedIn} = useAuth()
    const params = useParams();
    const router = useRouter();
    // useEffect(() => {
    //     localStorage.setItem('isVerificationRequestSend', JSON.stringify(isVerificationRequestSend));
    // }, [isVerificationRequestSend]);
    const form = useForm<z.infer<typeof ProfileSchema>>({
        resolver:zodResolver(LoginSchema),
        defaultValues:{
            file: undefined,
        }
    });
    const sendVerificationRequest = async () => {
        try {
            const response = await fetch(SET_VERIFICATION_REQUEST_COMPANY_NAME, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });

            if (response.ok) {
                setIsVerificationRequestSend(true)
                setSuccess("Вы успешно подали запрос на верификацию имени");
                toast({
                    title: 'Вы успешно подали запрос на верификацию имени',
                    description: `${new Date()}`,
                    action: (
                        <ToastAction altText="Назад">Хорошо</ToastAction>
                    ),
                });
            } else {
                setIsVerificationRequestSend(false);
                setError(await response.json());
                toast({
                    variant: 'destructive',
                    title: "Ошибка при подаче запроса на верификацию имени",
                    description: `Попробуйте ещё раз`,
                    action: (
                        <ToastAction altText="Ок">Хорошо</ToastAction>
                    )
                });
            }
        } catch (e) {
            setError((e as Error).message);
            toast({
                variant: 'destructive',
                title: "Ошибка",
                description: (e as Error).message,
                action: (
                    <ToastAction altText="Ок">Хорошо</ToastAction>
                )
            });
        }
    };
    if(!isLoggedIn){
        return notFound();
    }

    const handleFileChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files && e.target.files.length > 0)
        {
            setSelectedFile(e.target.files[0]);
        }
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!selectedFile) {
            setError('No file selected');
            return;
        }
        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await fetch(ADD_PHOTO, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: formData
            });
            console.log(await response.json());
            if(response.ok){
                toast({
                    title: "Фото успешно загружено",
                    description: `Ваше фото было успешно загружено.`,
                    action: (
                        <ToastAction altText="Ок">Хорошо</ToastAction>
                    )
                });
            }
            else{
                toast({
                    variant: 'destructive',
                    title: "Ошибка при загрузке фото",
                    description: `Произошла ошибка при загрузке фото. Попробуйте еще раз.`,
                    action: (
                        <ToastAction altText="Ок">Хорошо</ToastAction>
                    )
                });
            }
        } catch (error) {
            console.error('Error uploading photo', error);
            toast({
                variant: 'destructive',
                title: "Ошибка при загрузке фото",
                description: `Произошла ошибка при загрузке фото. Попробуйте еще раз.`,
                action: (
                    <ToastAction altText="Ок">Хорошо</ToastAction>
                )
            });
        }
    }

    return (
        <div className={'flex justify-center max-w- self-center shadow p-4 m-2 my-6 rounded-2xl gap-5 border relative max-w-screen-lg w-full mx-auto'}>
            <Button onClick={() => router.back()} className={'absolute left-1 self-start mt-8 space-x-2 hover:no-underline hover:opacity-75 transition-all'} variant={'link'} type={'button'}>
                <svg  width="25" height="25" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M6.85355 3.85355C7.04882 3.65829 7.04882 3.34171 6.85355 3.14645C6.65829 2.95118 6.34171 2.95118 6.14645 3.14645L2.14645 7.14645C1.95118 7.34171 1.95118 7.65829 2.14645 7.85355L6.14645 11.8536C6.34171 12.0488 6.65829 12.0488 6.85355 11.8536C7.04882 11.6583 7.04882 11.3417 6.85355 11.1464L3.20711 7.5L6.85355 3.85355ZM12.8536 3.85355C13.0488 3.65829 13.0488 3.34171 12.8536 3.14645C12.6583 2.95118 12.3417 2.95118 12.1464 3.14645L8.14645 7.14645C7.95118 7.34171 7.95118 7.65829 8.14645 7.85355L12.1464 11.8536C12.3417 12.0488 12.6583 12.0488 12.8536 11.8536C13.0488 11.6583 13.0488 11.3417 12.8536 11.1464L9.20711 7.5L12.8536 3.85355Z"
                        fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                </svg>
                <h2 className={'text-xl'}>
                    Назад
                </h2>
            </Button>

            <div className={'p-2 flex flex-col  justify-center rounded'}>
            <div className={'flex justify-center space-x-4 '}>
                <h1 className={'text-3xl self-center flex justify-center font-bold mt-4 p-2 rounded-2xl'}>Здравствуйте, {user?.username}!</h1>
                <Dialog>
                    <DialogTrigger asChild>
                        {/*<Paperclip />*/}
                        <Avatar  className={'self-center h-14 w-14 hover:after:'}>
                            <AvatarImage
                                src='https://cdn-icons-png.flaticon.com/512/8801/8801434.png'/>
                            <AvatarFallback>VC</AvatarFallback>
                        </Avatar>
                    </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Загрузка фото профиля</DialogTitle>
                                <DialogDescription>
                                    Здесь вы можете загрузить фото для профиля. Нажмите "Сохранить" после того как загрузили фотографию.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <FormProvider {...form}>
                                <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
                                    <FormField
                                        control={form.control}
                                        name="file"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input type="file" onChange={handleFileChange} />
                                                </FormControl>
                                                <FormDescription>
                                                    Выберите файл для загрузки фотографии.
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <DialogClose asChild>
                                        <Button type={'submit'} size={"lg"} className={'h-12 p-4 border-black bg-green-600 rounded  font-bold  transition'} >
                                            <span>Загрузить</span>
                                        </Button>
                                    </DialogClose>

                                </form>
                                </FormProvider>
                            </div>
                        </DialogContent>
                </Dialog>
            </div>
                {user?.type === 'company' && !user.is_superuser && !user?.is_verified && !isVerificationRequestSend &&
                <div className={'flex flex-col justify-end self-center p-2 '}>
                        <Button
                            variant="outline"
                            onClick={() => {
                                void sendVerificationRequest()
                            }}
                        >
                            Отправить запрос на верификацию имени
                        </Button>
                </div>
                }
                {isVerificationRequestSend && !user?.is_verified &&
                    <div className={'flex justify-center gap-x-2 max-w-md self-center'}>
                        <div className={'flex self-center gap-x-2 bg-green-600 p-2 text-sm rounded-full'}>
                            <Check className={''} />
                        </div>
                        <FormSuccess message={'Запрос на верификацию успешно отправлен на рассмотрение'} />
                    </div>
                }
            <div className={'flex flex-col self-center pl-32 pr-32 justify-center mt-12 space-y-4'}>
                <div className={'flex text-2xl '}>
                    <h2 className={'font-bold  min-w-[150px]'}>Email :</h2>
                    <h2>{user?.email} </h2>
                </div>
                {user?.description &&
                    <div className={'flex text-2xl'}>
                        <h2 className={'font-bold  min-w-[150px]'}>О вас: </h2>
                        <h2 className={'text-xl'}>{user?.description} </h2>
                    </div>
                }
            </div>
                <div className={'flex justify-items-center self-center mt-12 text-3xl'}>
                    {user?.is_superuser ?
                        <h2 className={'font-extralight '}>Администратор</h2>
                        :
                        <h2 className={'font-extralight '}>{user?.type === 'user' ? `Вы ищите работу` : `Вы ищите работника`} </h2>
                    }
                </div>

                    {user?.is_superuser ?
                        <div className={'space-y-4  flex flex-col'}>
                            <Button  className={'flex gap-x-2  h-16 justify-center text-2xl font-extrabold mt-4 self-center'}
                                    onClick={() => router.replace('/dashboard/verifications')}>
                                <MailPlus  strokeWidth={3}/>
                                Запросы на Верификацию
                            </Button>
                            <Button className={'flex gap-x-2 h-16 justify-center font-extrabold text-2xl  mt-4 self-center'}
                                    onClick={() => router.replace('/dashboard/complaints')}>
                                <BadgeAlert strokeWidth={3} />
                                Жалобы
                            </Button>
                        </div>
                        :
                        <Button className={'flex w-96 h-16 justify-center text-xl  mt-4 self-center'}
                                onClick={() => router.replace(`${user?.type === 'company' ? `/vacancies` : `/jobseekers`}/me`)}>
                            Мои {user?.type === 'company' ? `Вакансии` : `Резюме`}</Button>
                    }

            </div>
        </div>
    );
};

export default Page;