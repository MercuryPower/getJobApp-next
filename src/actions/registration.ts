'use server';

import {z} from "zod";
import {LoginSchema, RegistrationSchema} from "@/schemas";



export const register = async (values: z.infer<typeof RegistrationSchema>, type: 'vacancy') => {
    const validatedFields = RegistrationSchema.safeParse(values)
    // if(!validatedFields.success){
    //     return {error: 'Ошибка при авторизации'};
    // }
    // if(validatedFields.success){
    //     return {success: 'Успешная авторизация'};
    // }
    console.log(values)
    const {username ,email, password} = values;
    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: username,email:email, password, type}),
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