'use client'
import React, {useState, useTransition} from 'react';
import CreateVacancyOrResume from "@/components/forms/CreateVacancyOrResume";
import {FormProvider, useForm} from "react-hook-form";
import {z} from "zod";
import {VacancyCreateSchema} from "@/schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import {useAuth} from "@/components/providers";
import {Option} from "@/components/multiselect";
import {useRouter} from "next/navigation";

const Page = () => {
    const [isPending, startTransition] = useTransition();
    const {user} = useAuth();
    const [range, setRange] = useState([0, 500000]);
    const [isByAgreement, setIsByAgreement] = useState(false);
    const [isFixedSalary, setIsFixedSalary] = useState(true)
    const router = useRouter()
    if(user?.type !== 'user'){
        return router.replace('/');
    }
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
            typeOfEmploy:[]
        }
    })
    function onSubmit(values: z.infer<typeof VacancyCreateSchema>) {
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
                typeOfEmploy: values.typeOfEmploy
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
                    <CreateVacancyOrResume onConfirm={onSubmit}/>
            </form>
            </FormProvider>
                {/*<FormError message />*/}
                {/*<FormSuccess message />*/}
        </div>
    );
};

export default Page;