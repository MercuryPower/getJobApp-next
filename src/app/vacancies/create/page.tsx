'use client'
import React from 'react';
import {Form, FormProvider, useForm} from "react-hook-form";
import {z} from "zod";
import {LoginSchema, RegistrationSchema, VacancyCreateSchema} from "@/schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import {register} from "@/actions/registration";
import {login} from "@/actions/login";
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import FormError from "@/components/forms/form-error";
import FormSuccess from "@/components/forms/form-success";
import {Button} from "@/components/ui/button";
import {Slider} from "@/components/ui/slider";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {useRouter} from "next/navigation";

const Page = ({}) => {
    const router = useRouter()
    const form = useForm<z.infer<typeof VacancyCreateSchema>>({
        resolver: zodResolver(VacancyCreateSchema),
        defaultValues: {
            vacancyName: '',
            fixedSalary:0,
            minSalary: 0,
            maxSalary: 0,
            vacancyDescription:'',
            contacts:'',
            resume:'',
            exp:''
        }
    })

    function onSubmit(values: z.infer<typeof VacancyCreateSchema>) {
        return values;
    }
    return (
        <div className={'flex justify-center p-4'}>
            <FormProvider {...form}>
                <form className={'space-y-8'} onSubmit={form.handleSubmit(onSubmit)}>
                    <FormLabel className={'flex justify-center p-4 text-2xl font-bold'}>Создание новой вакансии</FormLabel>
                    <FormField
                        control={form.control}
                        name="vacancyName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input autoComplete={'email'}  type={'email'} placeholder="example@gmail.com" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Введите адрес электронной почты
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="fixedSalary"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Фиксированная зарплата (в месяц)</FormLabel>
                                <FormControl>
                                    <Input autoComplete={'current-password'} type={'text'} placeholder="10 000 ₽" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="minSalary"
                        render={({ field }) => (
                            <FormItem  className={'space-y-4'}>
                                <FormLabel>Минимальная зарплата (от), ₽</FormLabel>
                                <FormControl>
                                    <Slider />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="maxSalary"
                        render={({ field }) => (
                            <FormItem  className={'space-y-4'}>
                                <FormLabel>Минимальная зарплата (до), ₽</FormLabel>
                                <FormControl>
                                    <Slider />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="vacancyDescription"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Описании вакансии</FormLabel>
                                <FormControl>
                                    <Input className={'h-96 w-full'} type={'text'} placeholder="Опишите вашу вакансию" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="contacts"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Контакты</FormLabel>
                                <FormControl>
                                    <Input autoComplete={'current-password'} type={'text'} placeholder="@Email, @GitHub, @Telegram, и иные ссылки" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="resume"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Резюме</FormLabel>
                                <FormControl>
                                    <>
                                        <Input autoComplete={'current-password'} type={'file'} placeholder="10 000 Р" {...field} />
                                        <Input autoComplete={'current-password'} type={'text'} placeholder="Портфолио: GitHub или что-то подобное" {...field} />
                                    </>

                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="exp"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Уровень навыка</FormLabel>
                                <FormControl>
                                    <Select >
                                        <SelectTrigger className="w-full text-xl">
                                            <SelectValue className="w-full text-xl" placeholder="Middle, Junior, Senior и т.д" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup className="w-full text-xl">
                                                <SelectLabel>Уровень опыта</SelectLabel>
                                                <SelectItem value="intern">Intern</SelectItem>
                                                <SelectItem value="junior">Junior</SelectItem>
                                                <SelectItem value="middle">Middle</SelectItem>
                                                <SelectItem value="senior">Senior</SelectItem>
                                                <SelectItem value="none">Другое</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className={'flex justify-center mt-12 space-x-4'}>
                        <Button  type={'submit'} size={"lg"} className={'h-12 border-black bg-green-600 rounded font-bold  transition'} >
                            <span>Создать резюме</span>
                        </Button>
                        <Button  type={'button'} onClick={() => router.back()} size={"lg"} className={'h-12 border-black opacity-50 rounded font-bold  transition'} >
                            <span>Отменить</span>
                        </Button>
                    </div>

                </form>
                {/*<FormError message />*/}
                {/*<FormSuccess message />*/}
            </FormProvider>
        </div>

    );
};

export default Page;