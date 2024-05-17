
import {z} from "zod";
import {LoginSchema} from "@/schemas";



export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: 'Ошибка при авторизации' };
    }
    try {
        const { email, password } = values;
        const formData = new URLSearchParams();
        formData.append('username', email); // Передаем 'username' вместо 'email'
        formData.append('password', password);

        const response = await fetch('http://127.0.0.1:8000/auth/jwt/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData,
        });
        if (response.ok) {
            const data = await response.json();
            const token = data.access_token;
            localStorage.setItem('token', token);
            console.log(data, token);
            data.success = 'Успешная авторизация'
            window.location.reload()
        } else {
            throw new Error('Ошибка при авторизации');
        }
    } catch (error) {
        throw new Error((error as Error).message);
    }

}