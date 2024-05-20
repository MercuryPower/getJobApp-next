'use client'
import React, {useState, useTransition} from 'react';
import {FormProvider, useForm} from "react-hook-form";
import {z} from "zod";
import {VacancyCreateSchema} from "@/schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
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
import SalarySlider from "@/components/filter/SalarySlider";
import {useAuth} from "@/components/providers";
import {Textarea} from "@/components/ui/textarea";
import MultipleSelector, {Option} from "@/components/multiselect";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle, DialogTrigger
} from "@/components/ui/dialog";
import CreateVacancyOrResume from "@/components/forms/CreateVacancyOrResume";
import loginSection from "@/components/sections/LoginSection";
const Page = () => {
    const [isPending, startTransition] = useTransition();
    const {user} = useAuth();
    const [skills, setSkills] = useState<Option[]>()
    const [cities, setCities] = useState<Option[]>()
    const [range, setRange] = useState([0, 500000]);
    const [isByAgreement, setIsByAgreement] = useState(false);
    const [isFixedSalary, setIsFixedSalary] = useState(true)
    const router = useRouter()
    console.log(isByAgreement, 'я из create/vacancies/page')

    const form = useForm<z.infer<typeof VacancyCreateSchema>>({
        resolver: zodResolver(VacancyCreateSchema),
        defaultValues: {
            vacancy_name: '',
            salary_type:'',
            fixed_salary:0,
            min_salary: 0,
            max_salary: 0,
            description:'',
            contacts:'',
            resume:'',
            exp:'',
            skills:[],
            cities:[],
            typeOfEmploy:[],
        }
    })
    if(user?.type !== 'company'){
        return router.replace('/');
    }
    function onSubmit (values: z.infer<typeof VacancyCreateSchema>) {
        if (values.exp === 'Other') {
            values.exp = '';
        }
        if (isByAgreement) {
            values.salary_type = 'agreement'

        } else {
            values.salary_type = isFixedSalary ? 'fixed' : 'range';
        }
        startTransition(() => {
            console.log(values)
            console.log(JSON.stringify(values))
            const newVacancy = {
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
                new_vacancy: newVacancy,
                cities: values.cities,
                skills: values.skills,
                typeOfEmploy: [], // Можно добавить значение вакансии по типу занятости, если нужно
            };
            fetch('http://127.0.0.1:8000/tests/add_vacancy', {
                method: 'POST',
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
                    console.log('Success:', data);
                    router.push('/vacancies')
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        })
    }

    return (
        <div className={'flex justify-center p-4 m-4'}>
            <FormProvider {...form}>
                <form className={'space-y-8'} onSubmit={form.handleSubmit(onSubmit)}>
                    <CreateVacancyOrResume onConfirm={onSubmit}
                    />
                </form>
                {/*<FormError message />*/}
                {/*<FormSuccess message />*/}
            </FormProvider>
        </div>

    );
};

export default Page;