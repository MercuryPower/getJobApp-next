'use client'
import React, {useEffect, useState, useTransition} from 'react';
import {z} from "zod";
import {VacancyCreateSchema} from "@/schemas";
import {FormProvider, useForm} from "react-hook-form";
import {Button} from "@/components/ui/button";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Switch} from "@/components/ui/switch";
import {Label} from "@/components/ui/label";
import SalarySlider from "@/components/filter/SalarySlider";
import MultipleSelector, {Option} from "@/components/multiselect";
import {Textarea} from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {useAuth} from "@/components/providers";
import {usePathname, useRouter} from "next/navigation";
import {zodResolver} from "@hookform/resolvers/zod";
import {VacancyInfo} from "@/types/types";
import {citiesForChoice, skillsForChoice, workTypes} from "@/data/data";

const Page = () => {
    const [isPending, startTransition] = useTransition();
    const {user, isLoggedIn} = useAuth();
    const pathname = usePathname();
    const [skills, setSkills] = useState<Option[]>([])
    const [cities, setCities] = useState<Option[]>([])
    const [range, setRange] = useState([0, 500000]);
    const [typesOfEmploy, setTypesOfEmploy] = useState<Option[]>([])
    const [isByAgreement, setIsByAgreement] = useState(false);
    const [isFixedSalary, setIsFixedSalary] = useState(true)
    const router = useRouter()
    const [vacancyData, setVacancyData] = useState<VacancyInfo>();
    const id = pathname.split('/')[2];
    const fetchVacancyData = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/tests/vacancy/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch vacancy data');
            }
            const vacancyData = await response.json();
            setVacancyData(vacancyData)
        } catch (error) {
            console.error('Error fetching vacancy data:', error);
            return null;
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchVacancyData();
            if (data) {
                setVacancyData(data);
            }
        };

        void fetchData();
    }, []);

    const form = useForm<z.infer<typeof VacancyCreateSchema>>({
        resolver: zodResolver(VacancyCreateSchema),
        defaultValues: {
            vacancy_name: vacancyData?.vacancy_name || '',
            salary_type: vacancyData?.salary_type || '',
            fixed_salary: vacancyData?.fixed_salary || 0,
            min_salary: vacancyData?.min_salary || 0,
            max_salary: vacancyData?.max_salary || 0,
            description: vacancyData?.description || '',
            contacts: vacancyData?.contacts || '',
            resume: vacancyData?.resume || '',
            exp: vacancyData?.exp || '',
            skills: vacancyData?.skills?.map(skill => skill.name) || [],
            cities: vacancyData?.cities?.map(city => city.name) || [],
            typeOfEmploy: vacancyData?.types_of_employ?.map(type => type.name) || [],
        }
    })
    useEffect(() => {
        if (vacancyData) {
            form.reset({
                vacancy_name: vacancyData.vacancy_name || '',
                salary_type: vacancyData.salary_type || '',
                fixed_salary: vacancyData.fixed_salary || 0,
                min_salary: vacancyData.min_salary || 0,
                max_salary: vacancyData.max_salary || 0,
                description: vacancyData.description || '',
                contacts: vacancyData.contacts || '',
                resume: vacancyData.resume || '',
                exp: vacancyData.exp || '',
                skills: vacancyData?.skills.map(skill => skill.name) || [],
                cities: vacancyData?.cities.map(city => city.name) || [],
                typeOfEmploy: vacancyData?.types_of_employ?.map(type => type.name) || [],
            });
            if (vacancyData.skills) {
                const skillsFromServer = vacancyData.skills.map(skill => ({
                    label: skill.name,
                    value: skill.name
                }));
                setSkills(skillsFromServer);
            }
            if (vacancyData.cities) {
                const citiesFromServer = vacancyData.cities.map(city => ({
                    label: city.name,
                    value: city.name
                }));
                setCities(citiesFromServer);
            }
            if (vacancyData.types_of_employ && vacancyData.types_of_employ?.length > 0) {
                const typesOfEmployFromServer = vacancyData.types_of_employ.map(type => ({
                    label: type.name,
                    value: type.name
                }));
                setTypesOfEmploy(typesOfEmployFromServer);
            }
        }

    }, [form, vacancyData]);
    function onSubmit (values: z.infer<typeof VacancyCreateSchema>) {
        if (values.exp === 'Other') {
            values.exp = '';
        }
        if (isByAgreement) {
            values.salary_type = 'agreement'
            values.fixed_salary = 0
            values.min_salary = 0
            values.max_salary = 0
        } else {
            values.salary_type = isFixedSalary ? 'fixed' : 'range';
        }
        startTransition(() => {
            const updatedVacancy = {
                vacancy_name: values.vacancy_name,
                fixed_salary: values.fixed_salary,
                min_salary: values.min_salary,
                max_salary: values.max_salary,
                salary_type: values.salary_type,
                description: values.description,
                contacts: values.contacts,
                resume: values.resume,
                exp: values.exp,
                is_reported: false,
            };

            const requestBody = {
                updated_vacancy: updatedVacancy,
                cities: values.cities,
                skills: values.skills,
                typeOfEmploy: values.typeOfEmploy,
            };
            fetch(`http://127.0.0.1:8000/tests/update_vacancy/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(requestBody),
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Ошибка при отправке данных');
                    }
                    return response.json();
                })
                .then(data => {
                    router.replace('/vacancies')
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        })
    }
    if(user?.type !== 'company'){
        return router.replace('/');
    }
    return (
        <div className={'flex justify-center p-4 m-4'}>
            <FormProvider {...form}>
                <form className={'space-y-8'} onSubmit={form.handleSubmit(onSubmit)}>
                    <div className={'flex self-center '}>
                        <Button onClick={()=> router.back()} className={'self-center space- '} type={'button'} variant={'link'} >
                            <svg width="25" height="25" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.85355 3.85355C7.04882 3.65829 7.04882 3.34171 6.85355 3.14645C6.65829 2.95118 6.34171 2.95118 6.14645 3.14645L2.14645 7.14645C1.95118 7.34171 1.95118 7.65829 2.14645 7.85355L6.14645 11.8536C6.34171 12.0488 6.65829 12.0488 6.85355 11.8536C7.04882 11.6583 7.04882 11.3417 6.85355 11.1464L3.20711 7.5L6.85355 3.85355ZM12.8536 3.85355C13.0488 3.65829 13.0488 3.34171 12.8536 3.14645C12.6583 2.95118 12.3417 2.95118 12.1464 3.14645L8.14645 7.14645C7.95118 7.34171 7.95118 7.65829 8.14645 7.85355L12.1464 11.8536C12.3417 12.0488 12.6583 12.0488 12.8536 11.8536C13.0488 11.6583 13.0488 11.3417 12.8536 11.1464L9.20711 7.5L12.8536 3.85355Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                        </Button>
                        <FormLabel className={'flex justify-center p-2 text-2xl font-bold'}>Редактирование вакансии</FormLabel>
                        <Button type={'button'} className={'self-center '} variant={'outline'} onClick={() => form.reset()}>
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.84998 7.49998C1.84998 4.66458 4.05979 1.84998 7.49998 1.84998C10.2783 1.84998 11.6515 3.9064 12.2367 5H10.5C10.2239 5 10 5.22386 10 5.5C10 5.77614 10.2239 6 10.5 6H13.5C13.7761 6 14 5.77614 14 5.5V2.5C14 2.22386 13.7761 2 13.5 2C13.2239 2 13 2.22386 13 2.5V4.31318C12.2955 3.07126 10.6659 0.849976 7.49998 0.849976C3.43716 0.849976 0.849976 4.18537 0.849976 7.49998C0.849976 10.8146 3.43716 14.15 7.49998 14.15C9.44382 14.15 11.0622 13.3808 12.2145 12.2084C12.8315 11.5806 13.3133 10.839 13.6418 10.0407C13.7469 9.78536 13.6251 9.49315 13.3698 9.38806C13.1144 9.28296 12.8222 9.40478 12.7171 9.66014C12.4363 10.3425 12.0251 10.9745 11.5013 11.5074C10.5295 12.4963 9.16504 13.15 7.49998 13.15C4.05979 13.15 1.84998 10.3354 1.84998 7.49998Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                        </Button>
                    </div>
                    <FormField
                        control={form.control}
                        name="vacancy_name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Название вакансии</FormLabel>
                                <FormControl>
                                    <Input type={'text'} placeholder="Название вакансии" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex items-center space-x-2">
                        <Switch id="salaryFixedSwitch" checked={isFixedSalary} disabled={isByAgreement}  onCheckedChange={(prev) => setIsFixedSalary(prev)} />
                        <Label htmlFor="salarySwitch">Фиксированная зарплата</Label>
                        <Switch id="salaryAgreementSwitch" checked={isByAgreement}  onCheckedChange={(prev) => setIsByAgreement(prev)} />
                        <Label htmlFor="salaryAgreementSwitch">Договоренная зарплата</Label>
                    </div>
                    {!isByAgreement && (
                        isFixedSalary ? (
                            <FormField
                                control={form.control}
                                name="fixed_salary"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Фиксированная зарплата (в месяц), ₽</FormLabel>
                                        <FormControl>
                                            <Input type="number"
                                                   placeholder="10 000 ₽"
                                                   {...field}
                                                   onChange={(e) => field.onChange(Number(e.target.value))}  />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        ) : (
                            <>
                                <FormField
                                    control={form.control}
                                    name="min_salary"
                                    render={() => (
                                        <FormItem className={'space-y-4'}>
                                            <FormLabel>Диапазон зарплаты, ₽</FormLabel>
                                            <FormControl>
                                                <FormItem>
                                                    <SalarySlider
                                                        onChangeMinSalary={(minSalary) => {
                                                            setRange([minSalary, range[1]]);
                                                            form.setValue('min_salary', minSalary)
                                                        }}
                                                        onChangeMaxSalary={(maxSalary)=>{
                                                            setRange([range[0], maxSalary]);
                                                            form.setValue('max_salary', maxSalary)
                                                        }}
                                                    />
                                                </FormItem>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </>
                        )
                    )}
                    <FormField
                        control={form.control}
                        name="typeOfEmploy"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Тип занятости</FormLabel>
                                <FormControl>
                                    <div className={'flex flex-col justify-center self-center  w-96 '}>
                                        <MultipleSelector
                                            {...field}
                                            value={typesOfEmploy}
                                            badgeClassName={'text-md'}
                                            creatable
                                            className={'self-center max-h-44 w-full h-20 overflow-y-auto overflow-x-hidden'}
                                            placeholder="Добавьте тип занятости"
                                            options={workTypes}
                                            onChange={(selectedWorkTypes) => {
                                                field.onChange(selectedWorkTypes.map(workType => workType.value));
                                            }}
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
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
                                    <Select onValueChange={field.onChange} defaultValue={field.value} >
                                        <SelectTrigger className="w-full h-16 text-xl">
                                            <SelectValue className="w-full text-xl" placeholder="Middle, Junior, Senior и т.д" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup className="w-full text-xl">
                                                <SelectLabel>Уровень опыта</SelectLabel>
                                                <SelectItem value="Intern">Intern</SelectItem>
                                                <SelectItem value="Junior">Junior</SelectItem>
                                                <SelectItem value="Middle">Middle</SelectItem>
                                                <SelectItem value="Senior">Senior</SelectItem>
                                                <SelectItem value="Other">Другое</SelectItem>
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
                                <FormLabel>Навыки</FormLabel>
                                <FormControl>
                                    <div className={'flex flex-col justify-center self-center  w-96 '}>
                                        <MultipleSelector
                                            {...field}
                                            badgeClassName={'text-md'}
                                            creatable
                                            className={'self-center max-h-44 w-full h-20 overflow-y-auto overflow-x-hidden'}
                                            placeholder="Добавьте навыки"
                                            options={skillsForChoice}
                                            value={skills}
                                            onChange={(selectedSkills) => {
                                                field.onChange(selectedSkills.map(skill => skill.value))
                                            }}
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="cities"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Город</FormLabel>
                                <FormControl>
                                    <div className={'flex flex-col justify-center self-center w-96'}>
                                        <MultipleSelector
                                            {...field}
                                            badgeClassName={'text-md'}
                                            creatable className={'self-center max-h-40 h-16 w-full overflow-y-auto overflow-x-hidden'}
                                            placeholder="Добавьте города"
                                            options={citiesForChoice}
                                            value={cities}
                                            onChange={(selectedCities) => {
                                                field.onChange(selectedCities.map(city => city.value))
                                            }}
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className={'flex justify-center mt-12 space-x-4'}>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button size={"lg"} className={'h-12 border-black bg-green-600 rounded font-bold  transition'} >
                                    <span>Изменить вакансию</span>
                                </Button>
                            </DialogTrigger>
                            <DialogContent className={'flex justify-center flex-col'}>
                                <DialogHeader>
                                    <DialogTitle>Хотите подтвердить изменение вакансии?</DialogTitle>
                                    <DialogDescription >
                                        После нажатия {`Подтвердить`} вакансия будет изменена.
                                        <br/> Вы уверены, что хотите продолжить?
                                    </DialogDescription>
                                </DialogHeader>
                                <Button className={'flex self-center bg-green-600 font-bo'} type={"submit"} onClick={form.handleSubmit(onSubmit)}>Подтвердить</Button>
                            </DialogContent>
                        </Dialog>
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