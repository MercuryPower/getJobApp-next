'use client'
import React from 'react';
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useForm, useFormContext} from "react-hook-form";
import FormSuccess from "@/components/forms/form-success";
import FormError from "@/components/forms/form-error";
import {LoginSchema} from "@/schemas";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";

interface UserFormProps{
    userType:string;
    isPending?:boolean;
    error?:string;
    success?:string;
}
const LoginForm = ({ userType,isPending, error, success }: UserFormProps) => {
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver:zodResolver(LoginSchema),
        defaultValues:{
            email: '',
            password: '',
        }
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(() => {})}>
                <FormLabel className={'flex justify-center p-4 underline'}>Пользователь</FormLabel>
                <div>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input autoComplete={'email'} disabled={isPending} type={'email'} placeholder="example@gmail.com" {...field} />
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
                                    <Input autoComplete={'current-password'} disabled={isPending} type={'password'} placeholder="Пароль" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button disabled={isPending} type={'submit'} size={"lg"} className={'h-12 p-4 border-black bg-green-600 rounded  font-bold  transition'} >
                        <span>Войти</span>
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default LoginForm;