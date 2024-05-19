'use client'
import React, {useState} from 'react';
import {Form, FormProvider, useForm} from "react-hook-form";
import {z} from "zod";
import {LoginSchema, RegistrationSchema, VacancyCreateSchema} from "@/schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
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
import {Label} from "@/components/ui/label";
import {Switch} from "@/components/ui/switch";
import {cn} from "@/lib/utils";
import SalarySlider from "@/components/filter/SalarySlider";
import {useAuth} from "@/components/providers";
import {Text} from "lucide-react";
import {Textarea} from "@/components/ui/textarea";
import MultipleSelector, {Option} from "@/components/multiselect";
const Page = () => {
    const {user} = useAuth();
    const [skills, setSkills] = useState<Option[]>()
    const [isRefresh, setIsRefresh] = useState(false)
    const [range, setRange] = useState([0, 500000]);
    const [isFixedSalary, setIsFixedSalary] = useState(true)
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
            exp:'',
            skills:[],
            cities:[],
        }
    })
    // if(user?.type !== 'company'){
    //     return router.push('/')
    // }
    function onSubmit(values: z.infer<typeof VacancyCreateSchema>) {
        return values;
    }

    return (
        <div className={'flex justify-center p-4 m-4'}>
            <FormProvider {...form}>
                <form className={'space-y-8'} onSubmit={form.handleSubmit(onSubmit)}>
                    <div className={'flex self-center '}>
                        <Button onClick={()=> router.back()} className={'self-center space- '} type={'button'} variant={'link'} >
                            <svg width="25" height="25" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.85355 3.85355C7.04882 3.65829 7.04882 3.34171 6.85355 3.14645C6.65829 2.95118 6.34171 2.95118 6.14645 3.14645L2.14645 7.14645C1.95118 7.34171 1.95118 7.65829 2.14645 7.85355L6.14645 11.8536C6.34171 12.0488 6.65829 12.0488 6.85355 11.8536C7.04882 11.6583 7.04882 11.3417 6.85355 11.1464L3.20711 7.5L6.85355 3.85355ZM12.8536 3.85355C13.0488 3.65829 13.0488 3.34171 12.8536 3.14645C12.6583 2.95118 12.3417 2.95118 12.1464 3.14645L8.14645 7.14645C7.95118 7.34171 7.95118 7.65829 8.14645 7.85355L12.1464 11.8536C12.3417 12.0488 12.6583 12.0488 12.8536 11.8536C13.0488 11.6583 13.0488 11.3417 12.8536 11.1464L9.20711 7.5L12.8536 3.85355Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                        </Button>
                        <FormLabel className={'flex justify-center p-2 text-2xl font-bold'}>Создание новой вакансии</FormLabel>
                        <Button type={'button'} className={'self-center '} variant={'outline'} onClick={() => form.reset()}>
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.84998 7.49998C1.84998 4.66458 4.05979 1.84998 7.49998 1.84998C10.2783 1.84998 11.6515 3.9064 12.2367 5H10.5C10.2239 5 10 5.22386 10 5.5C10 5.77614 10.2239 6 10.5 6H13.5C13.7761 6 14 5.77614 14 5.5V2.5C14 2.22386 13.7761 2 13.5 2C13.2239 2 13 2.22386 13 2.5V4.31318C12.2955 3.07126 10.6659 0.849976 7.49998 0.849976C3.43716 0.849976 0.849976 4.18537 0.849976 7.49998C0.849976 10.8146 3.43716 14.15 7.49998 14.15C9.44382 14.15 11.0622 13.3808 12.2145 12.2084C12.8315 11.5806 13.3133 10.839 13.6418 10.0407C13.7469 9.78536 13.6251 9.49315 13.3698 9.38806C13.1144 9.28296 12.8222 9.40478 12.7171 9.66014C12.4363 10.3425 12.0251 10.9745 11.5013 11.5074C10.5295 12.4963 9.16504 13.15 7.49998 13.15C4.05979 13.15 1.84998 10.3354 1.84998 7.49998Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                        </Button>
                    </div>
                    <FormField
                        control={form.control}
                        name="vacancyName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Название вакансии</FormLabel>
                                <FormControl>
                                    <Input  type={'text'} placeholder="Название вакансии" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex items-center space-x-2">
                        <Switch id="salarySwitch" checked={isFixedSalary}  onCheckedChange={(prev) => setIsFixedSalary(prev)} />
                        <Label htmlFor="salarySwitch">Фиксированная зарплата</Label>
                    </div>
                    {isFixedSalary ?
                        <FormField
                            control={form.control}
                            name="fixedSalary"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Фиксированная зарплата (в месяц), ₽</FormLabel>
                                    <FormControl>
                                        <Input type={'number'} placeholder="10 000 ₽" {...field}  />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        :
                        <>
                            <FormField
                                control={form.control}
                                name="minSalary"
                                render={({ field }) => (
                                    <FormItem  className={'space-y-4'}>
                                        <FormLabel>Диапазон зарплаты, ₽</FormLabel>
                                        <FormControl>
                                            <FormItem>
                                                <SalarySlider />
                                            </FormItem>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </>
                    }
                    <FormField
                        control={form.control}
                        name="vacancyDescription"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Описании вакансии</FormLabel>
                                <FormControl>
                                    <Textarea
                                        className={''}
                                        placeholder="Опишите вашу вакансию"
                                        {...field}
                                    />
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
                                    <Input type={'text'} placeholder="GitHub, ВКонтакте, Telegram, или иные ссылки" {...field} />
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
                                    <Input type={'text'} placeholder="Портфолио: GitHub или что-то подобное" {...field} />
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
                                        <SelectTrigger className="w-full h-16 text-xl">
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
                    <FormField
                        control={form.control}
                        name="skills"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Уровень навыка</FormLabel>
                                <FormControl>
                                    <div className={'flex flex-col justify-center self-center w-96'}>
                                        <MultipleSelector   creatable className={'self-center max-h-40 h-16 w-full overflow-y-auto overflow-x-hidden'}   placeholder="Выберите навыки"  options={skills}
                                        />
                                    </div>
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