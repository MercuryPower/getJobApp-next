'use server';

import {z} from "zod";
import {LoginSchema} from "@/schemas";



export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values)
    // if(!validatedFields.success){
    //     return {error: 'Ошибка при авторизации'};
    // }
    // if(validatedFields.success){
    //     return {success: 'Успешная авторизация'};
    // }
    console.log(values)
    const {email, password} = values;
    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: email, password}),
        });
        if (response.ok) {
            const data = await response.json();
            const token = data.token;
            localStorage.setItem('token', token);
            // router.push('/profile');
            console.log(data, token)
        }
    }
    catch(error: any){
        throw new Error((error as Error).message)
    }

}