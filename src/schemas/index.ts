import * as z from 'zod';

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Неправильный адрес электронной почты.",
    }),
    password: z.string().min(1,{
        message:'Необходимо ввести пароль'
    })
})