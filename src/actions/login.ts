import {z} from "zod";
import {LoginSchema} from "@/schemas";
import {cookies} from "next/headers";



export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: 'Ошибка при авторизации' };
    }
    try {
        const { email, password } = validatedFields.data;
        const formData = new URLSearchParams();
        formData.append('username', email);
        formData.append('password', password);

        const response = await fetch('http://127.0.0.1:8000/auth/jwt/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData,
            cache:'force-cache'
        });
        if (response.ok) {
            const data = await response.json();
            const token = data.access_token;
            localStorage.setItem('token', token);
            setTimeout(() => {
                window.location.reload();
            }, 300);
            return { success: 'Успешная авторизация' };
        }
        else{
            return {error:'Ошибка при проверка данных'}
        }
    } catch (error) {
        return {error:'Ошибка при авторизации'}
    }

}