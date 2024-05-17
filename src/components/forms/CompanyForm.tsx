import React from 'react';
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useFormContext} from "react-hook-form";
import FormError from "@/components/forms/form-error";
import FormSuccess from "@/components/forms/form-success";

interface CompanyFormProps{
    isPending?:boolean;
    error?:string;
    success?:string;
}
const CompanyForm = ({ isPending, error, success }: CompanyFormProps) => {

    const form = useFormContext();
    error = ''
    success = ''
    return (
        <>
            <FormLabel className={'flex justify-center p-4 underline m-2'}>Компания</FormLabel>
            {/*<FormField*/}
            {/*    control={form.control}*/}
            {/*    name="username"*/}
            {/*    render={({ field }) => (*/}
            {/*        <FormItem>*/}
            {/*            <FormLabel>Имя организации</FormLabel>*/}
            {/*            <FormControl>*/}
            {/*                <Input autoComplete={'username'} type={'text'} placeholder="Имя" {...field} />*/}
            {/*            </FormControl>*/}
            {/*            <FormMessage />*/}
            {/*        </FormItem>*/}
            {/*    )}*/}
            {/*/>*/}
            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input disabled={isPending} autoComplete={'email'} type={'email'} placeholder="example@gmail.com" {...field} />
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
                name="password"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Пароль</FormLabel>
                        <FormControl>
                            <Input disabled={isPending}  autoComplete={'current-password'}  type={'password'} placeholder="Пароль" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button disabled={isPending} type={'submit'} size={"lg"}  className={'h-12 p-4 border-black bg-green-600 rounded  font-bold  transition'} >
                <span>Войти</span>
            </Button>
        </>
    );
};

export default CompanyForm;