

import {TypeOf, z} from "zod";
import {LoginSchema, RegistrationSchema} from "@/schemas";
import {useRouter} from "next/navigation";
import {Router} from "next/router";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {router} from "next/client";


export const register = async (values: TypeOf<typeof RegistrationSchema>, type:string) => {

    const validatedFields = RegistrationSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: 'Ошибка при регистрации' };
    }
    console.log(values);

    try {
        'use server'
        const { username, email, password, description } = values;
        const payload = {
            username,
            email,
            password,
            description,
            type,
        };

        const response = await fetch('http://127.0.0.1:8000/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload),
            cache:'force-cache'
        });

        if (response.ok) {
            await response.json();
            setTimeout(() => {
                window.location.reload()
            }, 300);
            return { success: 'Успешная регистрация' };
        }
        else{
            return { error: 'Ошибка при регистрации' };
        }
    } catch (error: any) {
        return { error: 'Ошибка при регистрации' };
    }
};