'use server';

import {TypeOf, z} from "zod";
import {LoginSchema, RegistrationSchema} from "@/schemas";



export const register = async (values: TypeOf<typeof RegistrationSchema>, type: string) => {
    const validatedFields = RegistrationSchema.safeParse(values)
    if(!validatedFields.success){
        return {error: 'Ошибка при регистрации'};
    }
    console.log(values)

    try {
        const {username ,email, password} = values;
        const formData = new URLSearchParams();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('password', password);
        const response = await fetch('http://127.0.0.1:8000/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: username,email: email, password, type}),
        });
        if (response.ok) {
            const data = await response.json();
            const token = data.token;
            localStorage.setItem('token', token);
            console.log(data, token)
            setTimeout(() => {
                window.location.reload();
            }, 100);
            return { success: 'Успешная авторизация' };
        }
    }
    catch(error: any){
        throw new Error((error as Error).message)
    }

}