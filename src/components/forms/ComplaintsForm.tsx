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
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Select, SelectContent, SelectItem} from "@/components/ui/select";

const ComplaintsForm = ({vacancy_id, setIsDialogOpen, setHoveredResumeId }:{vacancy_id:number, setIsDialogOpen:(b:boolean) => void, setHoveredResumeId: (id: number | null) => void}) => {
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [isPending, startTransition] = useTransition()
    const form = useForm<z.infer<typeof ComplaintSchema>>({
        resolver: zodResolver(ComplaintSchema),
        defaultValues: {
            report_description: '',
        }
    })
    function onSubmit(values: z.infer<typeof ComplaintSchema>) {
        startTransition(() =>{
            try {
                sendComplaint(values as z.infer<typeof  ComplaintSchema>, vacancy_id)
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
        <FormProvider {...form}>
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
                        <Select>
                            <SelectContent>
                                <SelectItem value={'wrongName'}>Неправильное название</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormField
                            control={form.control}
                            name="report_description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Textarea
                                            className={''}
                                            placeholder="Опишите причину жалобы"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className={'flex justify-center self-center space-x-4'}>
                            <Button  disabled={isPending} size={'lg'} className={'font-bold'} type={"submit"} >Отправить жалобу</Button>
                            <DialogClose asChild>
                                <Button size={'lg'}
                                        className={'flex self-center  bg-green-600 font-bold'}>
                                    Отмена</Button>
                            </DialogClose>
                        </div>
                    </DialogContent>
                </Dialog>
            </form>
        </FormProvider>
    );
};

export default ComplaintsForm;