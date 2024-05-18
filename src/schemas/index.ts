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
    }),
})

export const VacancyCreateSchema = z.object({
    vacancyName: z.string().min(2,{
        message: 'Название вакансии должно состоять из больше чем 2 символов'
    }),
    fixedSalary: z.number(),
    minSalary: z.number(),
    maxSalary: z.number(),
    vacancyDescription: z.string(),
    contacts: z.string(),
    resume:z.string(),
    exp: z.string(),
})