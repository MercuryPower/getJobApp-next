import React, {startTransition, useState, useTransition} from 'react';
import {FormProvider, useForm} from "react-hook-form";
import {z} from "zod";
import {ComplaintSchema, LoginSchema, RegistrationSchema} from "@/schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import {register} from "@/actions/registration";
import {login} from "@/actions/login";
import {sendComplaint} from "@/actions/sendComplaint";
import {Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import style from "@/components/styles/style.module.sass";
import {Flag} from "lucide-react";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
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
import {Label} from "@/components/ui/label";
import FormSuccess from "@/components/forms/form-success";
import FormError from "@/components/forms/form-error";

const ComplaintsForm = ({vacancy_id, setIsDialogOpen, setHoveredResumeId, report_username }:{vacancy_id:number, setIsDialogOpen:(b:boolean) => void, setHoveredResumeId: (id: number | null) => void, report_username?: string}) => {
    const [error, setError] = useState('')
    if(!report_username){
        report_username = 'Аноним'
    }
    const [success, setSuccess] = useState('')
    const [isPending, startTransition] = useTransition()
    const form = useForm<z.infer<typeof ComplaintSchema>>({
        resolver: zodResolver(ComplaintSchema),
        defaultValues: {
            description: '',
        }
    })
    function onSubmit(values: z.infer<typeof ComplaintSchema>) {
        startTransition(() =>{
            try {
                sendComplaint(values as z.infer<typeof  ComplaintSchema>, vacancy_id, report_username)
                    .then((data) =>{
                        if (data?.error) {
                            setError(data.error);
                        } else if(data?.success){
                            setSuccess(data.success);
                        }
                    })
            } catch (error) {
                setError((error as Error).message);
            }
        })
    }
    const handleDialogClose = () => {
        setIsDialogOpen(false);
        setHoveredResumeId(null);
    };
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Dialog onOpenChange={(isOpen) => !isOpen && handleDialogClose()}>
                    <DialogTrigger asChild>
                        <div className={'flex gap-x-4 '}>
                            <Button variant={'ghost'}
                                    type={'button'}
                                    className={`${style.fadeIn} absolute -left-3 transition-all rounded-full`}
                                    size={'sm'}
                                    onClick={() => setIsDialogOpen(true)}
                            >
                                <Flag color="#e83030" size={18} />
                            </Button>
                        </div>
                    </DialogTrigger>
                    <DialogContent className={'flex self-center justify-between w-[700px] h-[400px] flex-col'} >
                        <DialogHeader className={'self-center'}>
                            <DialogTitle className={'text-2xl'}>Опишите жалобу</DialogTitle>
                        </DialogHeader>
                        <FormField
                            control={form.control}
                            name="report_type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Тип жалобы</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value} >
                                            <SelectTrigger >
                                                <SelectValue placeholder="Выберите тип жалобы" />
                                            </SelectTrigger>
                                            <SelectContent className={'max-h-lg self-center overflow-y-auto'}>
                                                <SelectGroup>
                                                    <SelectLabel className={'text-xl bg-green-600 rounded'}>Ложная информация о вакансии</SelectLabel>
                                                    <SelectItem value="Некорректное описание должности">Некорректное описание должности</SelectItem>
                                                    <SelectItem value="Неверные требования к кандидату">Неверные требования к кандидату</SelectItem>
                                                    <SelectItem value="Неактуальная информация о зарплате">Неактуальная информация о зарплате</SelectItem>
                                                    <SelectItem value="Несоответствие условий работы">Несоответствие условий работы</SelectItem>
                                                </SelectGroup>
                                                <SelectGroup>
                                                    <SelectLabel className={'text-xl bg-green-600 rounded'}>Мошенничество</SelectLabel>
                                                    <SelectItem value="Подозрительные запросы на предоплату">Подозрительные запросы на предоплату</SelectItem>
                                                    <SelectItem value="Сбор личной информации с подозрительными целями">Сбор личной информации с подозрительными целями</SelectItem>
                                                    <SelectItem value="Фальшивые вакансии">Фальшивые вакансии</SelectItem>
                                                </SelectGroup>
                                                <SelectGroup>
                                                    <SelectLabel className={'text-xl bg-green-600 rounded'}>Дискриминация</SelectLabel>
                                                    <SelectItem value="Дискриминация по возрасту, полу, расе, религии и т.д.">Дискриминация по возрасту, полу, расе, религии и т.д.</SelectItem>
                                                    <SelectItem value="Неправомерные вопросы на собеседованиях">Неправомерные вопросы на собеседованиях</SelectItem>
                                                </SelectGroup>
                                                <SelectGroup>
                                                    <SelectLabel className={'text-xl bg-green-600 rounded'}>Непрофессиональное поведение работодателя</SelectLabel>
                                                    <SelectItem value="Грубое обращение">Грубое обращение</SelectItem>
                                                    <SelectItem value="Некорректное проведение собеседования">Некорректное проведение собеседования</SelectItem>
                                                    <SelectItem value="Некомпетентность сотрудников HR">Некомпетентность сотрудников HR</SelectItem>
                                                </SelectGroup>
                                                <SelectGroup>
                                                    <SelectLabel className={'text-xl bg-green-600 rounded'}>Нарушение правил сайта</SelectLabel>
                                                    <SelectItem value="Проблемы с загрузкой резюме">Публикация неуместного контента</SelectItem>
                                                    <SelectItem value="Ошибки в работе сайта">Нарушение условий использования</SelectItem>
                                                </SelectGroup>
                                                <SelectGroup>
                                                    <SelectLabel className={'text-xl bg-green-600 rounded'}>Нарушение правил сайта</SelectLabel>
                                                    <SelectItem value="Проблемы с загрузкой резюме">Публикация неуместного контента</SelectItem>
                                                    <SelectItem value="Ошибки в работе сайта">Нарушение условий использования</SelectItem>
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
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Описание жалобы</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            className={''}
                                            placeholder="Напишите причину жалобы"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormSuccess message={success} />
                        <FormError message={error} />
                        <div className={'flex justify-center self-center space-x-4'}>
                            <Button onClick={form.handleSubmit(onSubmit)} type={'submit'} size={'lg'} className={'font-bold'} >Отправить жалобу</Button>
                            <DialogClose asChild>
                                <Button size={'lg'}
                                        className={'flex self-center  bg-green-600 font-bold'}>
                                    Отмена</Button>
                            </DialogClose>
                        </div>

                    </DialogContent>
                </Dialog>
            </form>
        </Form>
    );
};

export default ComplaintsForm;