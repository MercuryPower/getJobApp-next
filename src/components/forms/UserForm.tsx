import React from 'react';
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useFormContext} from "react-hook-form";
import FormSuccess from "@/components/forms/form-success";
import FormError from "@/components/forms/form-error";

interface UserFormProps{
    isPending?:boolean;
    error?:string;
    success?:string;
}
const UserForm = ({ isPending, error, success }: UserFormProps) => {
    const form = useFormContext();
    return (
        <Form {...form}>

                <FormLabel className={'flex justify-center p-4 underline'}>Пользователь</FormLabel>
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
                <Button  disabled={isPending} type={'submit'} size={"lg"} className={'h-12 p-4 border-black bg-green-600 rounded  font-bold  transition'} >
                    <span>Войти</span>
                </Button>


        </Form>
    );
};

export default UserForm;