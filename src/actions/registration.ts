

import {TypeOf, z} from "zod";
import {LoginSchema, RegistrationSchema} from "@/schemas";



export const register = async (values: TypeOf<typeof RegistrationSchema>, type: string) => {
    const validatedFields = RegistrationSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: 'Ошибка при регистрации' };
    }
    console.log(values);

    try {
        'use server'
        const { username, email, password } = values;
        const payload = {
            username,
            email,
            password,
            type
        };

        const response = await fetch('http://127.0.0.1:8000/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            await response.json();
            console.log("Response is OK, reloading page...");
            setTimeout(() => {
                window.location.reload();
            }, 100);
            return { success: 'Успешная регистрация' };
        } else {
            console.log("Response is not OK, not reloading page.");
        }
    } catch (error: any) {
        throw new Error(error.message);
    }
};