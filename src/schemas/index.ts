import * as z from 'zod';

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Неправильный адрес электронной почты.",
    }),
    password: z.string().min(1,{
        message:'Необходимо ввести пароль'
    })
})
export const RegistrationSchema = z.object({
    username: z.string().min(3, {
        message: 'Имя пользователя должно быть больше 3 символов'
    }),
    email: z.string().email({
        message: "Неправильный адрес электронной почты.",
    }),
    password: z.string().min(6,{
        message:'Пароль должен быть больше 6 символов'
    })
})
export const userSchema = z.object({
    email: z.string().email({ message: 'Неправильный адрес электронной почты' }),
    password: z.string().min(6, { message: 'Пароль должен быть больше 6 символов' }),
    username: z.string({ message: 'Username is required' }),
});
export const companySchema = z.object({
    companyName: z.string({ message: 'Имя организации должно быть' }),
    companyEmail: z.string().email({ message: 'Неправильный адрес электронной почты' }),
});