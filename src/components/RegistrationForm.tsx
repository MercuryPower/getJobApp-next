import React, {useState} from 'react';
import {useFormContext} from "react-hook-form";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import FormError from "@/components/forms/form-error";
import FormSuccess from "@/components/forms/form-success";
import {Button} from "@/components/ui/button";

interface RegistrationFormProps {
    isPending?:boolean;
    error?:string;
    success?:string;
    toggleRegistration: () => void;
}
const RegistrationForm = ({toggleRegistration,isPending,error,success}: RegistrationFormProps ) => {
    const form = useFormContext();
    return (
        <Form {...form}>
            <FormLabel className={'flex justify-center p-4 underline m-2'}>Регистрация</FormLabel>
            <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Имя пользователя</FormLabel>
                        <FormControl>
                            <Input disabled={isPending} autoComplete={'username'} type={'text'} placeholder="Имя" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input disabled={isPending}   autoComplete={'email'} type={'email'} placeholder="example@gmail.com" {...field} />
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
                <span>Регистрация</span>
            </Button>
            <Button type={'button'} onClick={toggleRegistration} size={'sm'} variant={'link'}>
                <span>Уже есть аккаунт?</span>
            </Button>
        </Form>
    );
};

export default RegistrationForm;