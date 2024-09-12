'use client'
import React, {FormEvent, useState, useTransition} from 'react';
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {zodResolver} from "@hookform/resolvers/zod";
import {FormProvider, useForm} from "react-hook-form";
import {z} from "zod";
import {
    Dialog,
    DialogContent,
    DialogTrigger
} from "@/components/ui/dialog";
import CompanyForm from "@/components/forms/CompanyForm";
import UserForm from "@/components/forms/UserForm";
import {login} from "@/features/login/login";
import RegistrationForm from "@/components/forms/RegistrationForm";
import {LoginSchema, RegistrationSchema} from "@/schemas";
import FormSuccess from "@/components/forms/form-success";
import FormError from "@/components/forms/form-error";
import {register} from "@/features/registration/registration";
import {ArrowRightToLine, ArrowUpToLine} from "lucide-react";

const LoginSection = () => {
    const [userType, setUserType] = useState('')
    const [isRegistration, setIsRegistration] = useState(false)
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string | undefined>('')
    const [success, setSuccess] = useState<string | undefined>('')

    const formSchema = isRegistration ? RegistrationSchema : LoginSchema;
    const form = useForm<z.infer<typeof LoginSchema | typeof RegistrationSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
            username: '',
            description: '',
        }
    })

    function onSubmit(values: z.infer<typeof LoginSchema> | z.infer<typeof RegistrationSchema>) {
        startTransition(() =>{
            try {
                console.log(isRegistration)
                if (isRegistration) {
                    register(values as z.infer<typeof  RegistrationSchema>, userType)
                        .then((data) =>{
                        if (data?.error) {
                            setError(data.error);
                        } else if(data?.success){
                            setSuccess(data.success);
                        }
                        void login({email: values.email, password: values.password})
                    })
                } else {
                    login(values as z.infer<typeof LoginSchema>).then((data) => {
                        console.log(data)
                        if (data?.error) {
                            setError(data.error);
                            console.log(data)
                        } else if(data?.success){
                            setSuccess(data.success);
                            console.log(data)
                        }
                    });
                }
            } catch (error) {
                setError((error as Error).message);
            }
        })

    }
    return (
        <FormProvider {...form}>
            <Dialog>
                <DialogTrigger asChild>
                    <Button  className={'h-12 sm:mr-12 gap-x-2  sm:text-sm p-4 flex justify-center self-center border-black bg-green-600 rounded  font-bold  transition'} >
                        <ArrowRightToLine />
                        <span className={`hidden lg:block`}>Войти</span>
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col p-8">
                        {isRegistration ? (
                            userType ? (
                                userType === 'company' ? (
                                    <>
                                        <Button type={'button'} onClick={() => setUserType('user')}>
                                            <span>Я ищу работу</span>
                                        </Button>
                                        <RegistrationForm userType={userType} isPending={isPending} error={error}
                                                          success={success}
                                                          toggleRegistration={() => setIsRegistration(false)}/>
                                    </>
                                    )
                                    :
                                    (
                                        <>
                                            <Button onClick={() => setUserType('company')}>
                                                <span>Я ищу работника</span>
                                            </Button>
                                            <RegistrationForm userType={userType} isPending={isPending} error={error}
                                                              success={success}
                                                              toggleRegistration={() => setIsRegistration(false)}/>
                                        </>
                                    )
                            )
                                : (
                                <>
                                    <Button type={'button'} onClick={() => setUserType('company')}>
                                        <span>Я ищу работника</span>
                                    </Button>
                                    <Button type={'button'} onClick={() => setUserType('user')}>
                                        <span>Я ищу работу</span>
                                    </Button>
                                </>
                            )
                        ) : (
                            <>
                                <UserForm success={success} error={error} isPending={isPending}/>
                                <Button type={'button'} onClick={() => setIsRegistration(true)} size={'sm'}
                                        variant={'link'}>
                                    <span>Нет аккаунта?</span>
                                </Button>
                            </>
                        )}
                    </form>
                </DialogContent>
            </Dialog>
        </FormProvider>
    );
};

export default LoginSection;